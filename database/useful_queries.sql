-- Class Roots - Useful Queries
-- Common queries for the Class Roots database

USE class_roots;

-- =============================================
-- STUDENT QUERIES
-- =============================================

-- Get all students with their parent information
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) as student_name,
    s.grade_level,
    s.age,
    CONCAT(p.first_name, ' ', p.last_name) as parent_name,
    p.parent_email,
    p.phone_number as parent_phone,
    spr.relationship_type
FROM students s
LEFT JOIN student_parent_relationships spr ON s.student_id = spr.student_id
LEFT JOIN parents p ON spr.parent_id = p.parent_id
WHERE s.is_active = TRUE
ORDER BY s.grade_level, s.last_name;

-- Get students by grade level
SELECT 
    student_id,
    CONCAT(first_name, ' ', last_name) as student_name,
    grade_level,
    age,
    student_email
FROM students 
WHERE grade_level = '3' AND is_active = TRUE
ORDER BY last_name;

-- Get student grades for a specific class
SELECT 
    s.first_name,
    s.last_name,
    c.class_name,
    g.assignment_name,
    g.assignment_type,
    g.points_earned,
    g.points_possible,
    g.percentage,
    g.letter_grade,
    g.submitted_date
FROM students s
JOIN grades g ON s.student_id = g.student_id
JOIN classes c ON g.class_id = c.class_id
WHERE s.student_id = 1 AND c.class_id = 4
ORDER BY g.submitted_date DESC;

-- Get student's overall grade average
SELECT 
    s.first_name,
    s.last_name,
    c.class_name,
    COUNT(g.grade_id) as total_assignments,
    ROUND(AVG(g.percentage), 2) as average_percentage,
    ROUND(AVG(g.points_earned / g.points_possible * 100), 2) as calculated_average
FROM students s
JOIN grades g ON s.student_id = g.student_id
JOIN classes c ON g.class_id = c.class_id
WHERE s.student_id = 1
GROUP BY s.student_id, c.class_id;

-- =============================================
-- BEHAVIOR QUERIES
-- =============================================

-- Get behavior scores for a specific student
SELECT 
    s.first_name,
    s.last_name,
    c.class_name,
    bs.behavior_type,
    bs.behavior_category,
    bs.behavior_description,
    bs.score,
    bs.date_occurred,
    bs.teacher_notes,
    CONCAT(t.first_name, ' ', t.last_name) as teacher_name
FROM students s
JOIN behavior_scores bs ON s.student_id = bs.student_id
JOIN classes c ON bs.class_id = c.class_id
JOIN teachers t ON bs.teacher_id = t.teacher_id
WHERE s.student_id = 1
ORDER BY bs.date_occurred DESC;

-- Get students with recent negative behaviors
SELECT 
    s.first_name,
    s.last_name,
    s.grade_level,
    bs.behavior_category,
    bs.behavior_description,
    bs.score,
    bs.date_occurred,
    CONCAT(t.first_name, ' ', t.last_name) as teacher_name
FROM students s
JOIN behavior_scores bs ON s.student_id = bs.student_id
JOIN teachers t ON bs.teacher_id = t.teacher_id
WHERE bs.behavior_type = 'Negative' 
    AND bs.date_occurred >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
ORDER BY bs.date_occurred DESC;

-- Get behavior summary by student
SELECT 
    s.first_name,
    s.last_name,
    s.grade_level,
    COUNT(CASE WHEN bs.behavior_type = 'Positive' THEN 1 END) as positive_behaviors,
    COUNT(CASE WHEN bs.behavior_type = 'Negative' THEN 1 END) as negative_behaviors,
    ROUND(AVG(CASE WHEN bs.behavior_type = 'Positive' THEN bs.score END), 2) as avg_positive_score,
    ROUND(AVG(CASE WHEN bs.behavior_type = 'Negative' THEN bs.score END), 2) as avg_negative_score
FROM students s
LEFT JOIN behavior_scores bs ON s.student_id = bs.student_id
WHERE s.is_active = TRUE
GROUP BY s.student_id
ORDER BY s.grade_level, s.last_name;

-- =============================================
-- TEACHER QUERIES
-- =============================================

-- Get all teachers with their classes
SELECT 
    t.first_name,
    t.last_name,
    t.subject_specialization,
    t.grade_levels_taught,
    c.class_name,
    c.subject,
    c.grade_level,
    c.room_number
FROM teachers t
LEFT JOIN classes c ON t.teacher_id = c.teacher_id
WHERE t.is_active = TRUE AND (c.is_active = TRUE OR c.is_active IS NULL)
ORDER BY t.last_name, c.grade_level;

-- Get teacher's class roster
SELECT 
    t.first_name as teacher_first_name,
    t.last_name as teacher_last_name,
    c.class_name,
    s.first_name as student_first_name,
    s.last_name as student_last_name,
    s.grade_level,
    sce.enrollment_date
FROM teachers t
JOIN classes c ON t.teacher_id = c.teacher_id
JOIN student_class_enrollments sce ON c.class_id = sce.class_id
JOIN students s ON sce.student_id = s.student_id
WHERE t.teacher_id = 2 AND sce.status = 'Active'
ORDER BY s.last_name;

-- =============================================
-- PARENT QUERIES
-- =============================================

-- Get parent's children information
SELECT 
    p.first_name as parent_first_name,
    p.last_name as parent_last_name,
    s.first_name as student_first_name,
    s.last_name as student_last_name,
    s.grade_level,
    s.age,
    spr.relationship_type,
    spr.is_primary_contact
FROM parents p
JOIN student_parent_relationships spr ON p.parent_id = spr.parent_id
JOIN students s ON spr.student_id = s.student_id
WHERE p.parent_id = 1 AND s.is_active = TRUE
ORDER BY s.grade_level;

-- Get parent's child's recent grades
SELECT 
    p.first_name as parent_name,
    s.first_name as student_name,
    s.last_name as student_last_name,
    c.class_name,
    g.assignment_name,
    g.assignment_type,
    g.percentage,
    g.letter_grade,
    g.submitted_date
FROM parents p
JOIN student_parent_relationships spr ON p.parent_id = spr.parent_id
JOIN students s ON spr.student_id = s.student_id
JOIN grades g ON s.student_id = g.student_id
JOIN classes c ON g.class_id = c.class_id
WHERE p.parent_id = 1
ORDER BY g.submitted_date DESC
LIMIT 10;

-- =============================================
-- COMMUNICATION QUERIES
-- =============================================

-- Get recent communications for a parent
SELECT 
    cl.communication_id,
    cl.subject,
    cl.message,
    cl.communication_type,
    cl.priority,
    cl.status,
    cl.sent_at,
    CASE 
        WHEN cl.sender_type = 'Teacher' THEN CONCAT(t.first_name, ' ', t.last_name)
        WHEN cl.sender_type = 'Admin' THEN CONCAT(a.first_name, ' ', a.last_name)
        ELSE 'Parent'
    END as sender_name,
    s.first_name as student_name,
    s.last_name as student_last_name
FROM communication_log cl
LEFT JOIN teachers t ON cl.sender_id = t.teacher_id AND cl.sender_type = 'Teacher'
LEFT JOIN administrators a ON cl.sender_id = a.admin_id AND cl.sender_type = 'Admin'
LEFT JOIN students s ON cl.student_id = s.student_id
WHERE cl.recipient_id = 1 AND cl.recipient_type = 'Parent'
ORDER BY cl.sent_at DESC;

-- Get unread communications count by parent
SELECT 
    p.first_name,
    p.last_name,
    COUNT(CASE WHEN cl.status = 'Sent' OR cl.status = 'Delivered' THEN 1 END) as unread_count
FROM parents p
LEFT JOIN communication_log cl ON p.parent_id = cl.recipient_id AND cl.recipient_type = 'Parent'
WHERE p.is_active = TRUE
GROUP BY p.parent_id
HAVING unread_count > 0
ORDER BY unread_count DESC;

-- =============================================
-- ADMINISTRATIVE QUERIES
-- =============================================

-- Get school statistics
SELECT 
    'Total Students' as metric,
    COUNT(*) as count
FROM students 
WHERE is_active = TRUE
UNION ALL
SELECT 
    'Total Teachers' as metric,
    COUNT(*) as count
FROM teachers 
WHERE is_active = TRUE
UNION ALL
SELECT 
    'Total Parents' as metric,
    COUNT(*) as count
FROM parents 
WHERE is_active = TRUE
UNION ALL
SELECT 
    'Active Classes' as metric,
    COUNT(*) as count
FROM classes 
WHERE is_active = TRUE;

-- Get grade distribution by class
SELECT 
    c.class_name,
    c.subject,
    c.grade_level,
    COUNT(g.grade_id) as total_assignments,
    ROUND(AVG(g.percentage), 2) as class_average,
    COUNT(CASE WHEN g.letter_grade IN ('A+', 'A', 'A-') THEN 1 END) as a_grades,
    COUNT(CASE WHEN g.letter_grade IN ('B+', 'B', 'B-') THEN 1 END) as b_grades,
    COUNT(CASE WHEN g.letter_grade IN ('C+', 'C', 'C-') THEN 1 END) as c_grades,
    COUNT(CASE WHEN g.letter_grade IN ('D+', 'D', 'D-') THEN 1 END) as d_grades,
    COUNT(CASE WHEN g.letter_grade = 'F' THEN 1 END) as f_grades
FROM classes c
LEFT JOIN grades g ON c.class_id = g.class_id
WHERE c.is_active = TRUE
GROUP BY c.class_id
ORDER BY c.grade_level, c.subject;

-- Get behavior trends by month
SELECT 
    DATE_FORMAT(bs.date_occurred, '%Y-%m') as month,
    COUNT(CASE WHEN bs.behavior_type = 'Positive' THEN 1 END) as positive_count,
    COUNT(CASE WHEN bs.behavior_type = 'Negative' THEN 1 END) as negative_count,
    ROUND(COUNT(CASE WHEN bs.behavior_type = 'Positive' THEN 1 END) / 
          NULLIF(COUNT(bs.behavior_id), 0) * 100, 2) as positive_percentage
FROM behavior_scores bs
WHERE bs.date_occurred >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(bs.date_occurred, '%Y-%m')
ORDER BY month;

-- =============================================
-- REPORTING QUERIES
-- =============================================

-- Generate student report card
SELECT 
    s.first_name,
    s.last_name,
    s.grade_level,
    c.class_name,
    c.subject,
    COUNT(g.grade_id) as assignments_completed,
    ROUND(AVG(g.percentage), 2) as final_percentage,
    ROUND(AVG(CASE WHEN g.assignment_type = 'Test' THEN g.percentage END), 2) as test_average,
    ROUND(AVG(CASE WHEN g.assignment_type = 'Quiz' THEN g.percentage END), 2) as quiz_average,
    ROUND(AVG(CASE WHEN g.assignment_type = 'Homework' THEN g.percentage END), 2) as homework_average
FROM students s
JOIN student_class_enrollments sce ON s.student_id = sce.student_id
JOIN classes c ON sce.class_id = c.class_id
LEFT JOIN grades g ON s.student_id = g.student_id AND c.class_id = g.class_id
WHERE s.student_id = 1 AND sce.status = 'Active'
GROUP BY s.student_id, c.class_id
ORDER BY c.subject;

-- Get parent engagement metrics
SELECT 
    p.first_name,
    p.last_name,
    COUNT(DISTINCT spr.student_id) as children_count,
    COUNT(cl.communication_id) as total_communications,
    COUNT(CASE WHEN cl.status = 'Read' THEN 1 END) as read_communications,
    ROUND(COUNT(CASE WHEN cl.status = 'Read' THEN 1 END) / 
          NULLIF(COUNT(cl.communication_id), 0) * 100, 2) as engagement_rate
FROM parents p
JOIN student_parent_relationships spr ON p.parent_id = spr.parent_id
LEFT JOIN communication_log cl ON p.parent_id = cl.recipient_id AND cl.recipient_type = 'Parent'
WHERE p.is_active = TRUE
GROUP BY p.parent_id
ORDER BY engagement_rate DESC;
