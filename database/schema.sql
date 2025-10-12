-- Class Roots Database Schema
-- MySQL Database for K-8 Education Communication Platform

-- Create database
CREATE DATABASE IF NOT EXISTS class_roots;
USE class_roots;

-- =============================================
-- STUDENTS TABLE
-- =============================================
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    student_email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(255),
    grade_level ENUM('K', '1', '2', '3', '4', '5', '6', '7', '8') NOT NULL,
    age INT NOT NULL,
    date_of_birth DATE,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    medical_notes TEXT,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    CHECK (age >= 4 AND age <= 15),
    CHECK (student_email LIKE '%@%')
);

-- =============================================
-- TEACHERS TABLE
-- =============================================
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    teacher_email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(255),
    subject_specialization VARCHAR(100),
    grade_levels_taught SET('K', '1', '2', '3', '4', '5', '6', '7', '8'),
    room_number VARCHAR(20),
    hire_date DATE,
    salary DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    CHECK (teacher_email LIKE '%@%')
);

-- =============================================
-- PARENTS TABLE
-- =============================================
CREATE TABLE parents (
    parent_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    parent_email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    relationship_to_student ENUM('Mother', 'Father', 'Guardian', 'Grandparent', 'Other') NOT NULL,
    emergency_contact BOOLEAN DEFAULT FALSE,
    preferred_contact_method ENUM('Email', 'Phone', 'Text') DEFAULT 'Email',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    CHECK (parent_email LIKE '%@%')
);

-- =============================================
-- ADMINISTRATORS TABLE
-- =============================================
CREATE TABLE administrators (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    admin_email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(255),
    position_title VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    access_level ENUM('Super Admin', 'Principal', 'Vice Principal', 'Department Head', 'Staff') NOT NULL,
    hire_date DATE,
    salary DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    CHECK (admin_email LIKE '%@%')
);

-- =============================================
-- CLASSES TABLE
-- =============================================
CREATE TABLE classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(100) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    grade_level ENUM('K', '1', '2', '3', '4', '5', '6', '7', '8') NOT NULL,
    teacher_id INT NOT NULL,
    room_number VARCHAR(20),
    semester ENUM('Fall', 'Spring', 'Summer') NOT NULL,
    school_year VARCHAR(9) NOT NULL, -- Format: 2024-2025
    max_students INT DEFAULT 30,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
);

-- =============================================
-- STUDENT-PARENT RELATIONSHIPS
-- =============================================
CREATE TABLE student_parent_relationships (
    relationship_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    parent_id INT NOT NULL,
    relationship_type ENUM('Primary', 'Secondary', 'Emergency') DEFAULT 'Primary',
    is_primary_contact BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES parents(parent_id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_parent (student_id, parent_id)
);

-- =============================================
-- STUDENT-CLASS ENROLLMENTS
-- =============================================
CREATE TABLE student_class_enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    status ENUM('Active', 'Dropped', 'Completed') DEFAULT 'Active',
    final_grade VARCHAR(3),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_class (student_id, class_id)
);

-- =============================================
-- GRADES TABLE
-- =============================================
CREATE TABLE grades (
    grade_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    assignment_name VARCHAR(100) NOT NULL,
    assignment_type ENUM('Homework', 'Quiz', 'Test', 'Project', 'Participation', 'Other') NOT NULL,
    points_earned DECIMAL(5,2) NOT NULL,
    points_possible DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS ((points_earned / points_possible) * 100) STORED,
    letter_grade VARCHAR(3) GENERATED ALWAYS AS (
        CASE 
            WHEN (points_earned / points_possible) >= 0.97 THEN 'A+'
            WHEN (points_earned / points_possible) >= 0.93 THEN 'A'
            WHEN (points_earned / points_possible) >= 0.90 THEN 'A-'
            WHEN (points_earned / points_possible) >= 0.87 THEN 'B+'
            WHEN (points_earned / points_possible) >= 0.83 THEN 'B'
            WHEN (points_earned / points_possible) >= 0.80 THEN 'B-'
            WHEN (points_earned / points_possible) >= 0.77 THEN 'C+'
            WHEN (points_earned / points_possible) >= 0.73 THEN 'C'
            WHEN (points_earned / points_possible) >= 0.70 THEN 'C-'
            WHEN (points_earned / points_possible) >= 0.67 THEN 'D+'
            WHEN (points_earned / points_possible) >= 0.63 THEN 'D'
            WHEN (points_earned / points_possible) >= 0.60 THEN 'D-'
            ELSE 'F'
        END
    ) STORED,
    due_date DATE,
    submitted_date DATE,
    teacher_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE,
    
    -- Constraints
    CHECK (points_earned >= 0),
    CHECK (points_possible > 0),
    CHECK (points_earned <= points_possible)
);

-- =============================================
-- BEHAVIOR SCORES TABLE
-- =============================================
CREATE TABLE behavior_scores (
    behavior_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    teacher_id INT NOT NULL,
    behavior_type ENUM('Positive', 'Negative', 'Neutral') NOT NULL,
    behavior_category ENUM(
        'Respect', 'Responsibility', 'Safety', 'Participation', 
        'Cooperation', 'Following Directions', 'Classwork', 'Other'
    ) NOT NULL,
    behavior_description TEXT NOT NULL,
    score INT NOT NULL, -- 1-5 scale (1=Poor, 5=Excellent)
    date_occurred DATE NOT NULL,
    teacher_notes TEXT,
    parent_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    
    -- Constraints
    CHECK (score >= 1 AND score <= 5)
);

-- =============================================
-- COMMUNICATION LOG TABLE
-- =============================================
CREATE TABLE communication_log (
    communication_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    sender_type ENUM('Teacher', 'Parent', 'Admin') NOT NULL,
    recipient_id INT NOT NULL,
    recipient_type ENUM('Teacher', 'Parent', 'Admin') NOT NULL,
    student_id INT,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    communication_type ENUM('Email', 'Phone', 'In-Person', 'App Message') NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    status ENUM('Sent', 'Delivered', 'Read', 'Replied') DEFAULT 'Sent',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    reply_to_id INT NULL,
    
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE SET NULL,
    FOREIGN KEY (reply_to_id) REFERENCES communication_log(communication_id) ON DELETE SET NULL
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Student indexes
CREATE INDEX idx_students_grade ON students(grade_level);
CREATE INDEX idx_students_active ON students(is_active);
CREATE INDEX idx_students_name ON students(last_name, first_name);

-- Teacher indexes
CREATE INDEX idx_teachers_active ON teachers(is_active);
CREATE INDEX idx_teachers_grade_levels ON teachers(grade_levels_taught);

-- Parent indexes
CREATE INDEX idx_parents_active ON parents(is_active);
CREATE INDEX idx_parents_relationship ON parents(relationship_to_student);

-- Admin indexes
CREATE INDEX idx_admins_active ON administrators(is_active);
CREATE INDEX idx_admins_access_level ON administrators(access_level);

-- Class indexes
CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_classes_grade ON classes(grade_level);
CREATE INDEX idx_classes_semester ON classes(semester, school_year);

-- Grade indexes
CREATE INDEX idx_grades_student ON grades(student_id);
CREATE INDEX idx_grades_class ON grades(class_id);
CREATE INDEX idx_grades_date ON grades(submitted_date);

-- Behavior indexes
CREATE INDEX idx_behavior_student ON behavior_scores(student_id);
CREATE INDEX idx_behavior_class ON behavior_scores(class_id);
CREATE INDEX idx_behavior_teacher ON behavior_scores(teacher_id);
CREATE INDEX idx_behavior_date ON behavior_scores(date_occurred);

-- Communication indexes
CREATE INDEX idx_comm_sender ON communication_log(sender_id, sender_type);
CREATE INDEX idx_comm_recipient ON communication_log(recipient_id, recipient_type);
CREATE INDEX idx_comm_student ON communication_log(student_id);
CREATE INDEX idx_comm_date ON communication_log(sent_at);

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- Student with parent information
CREATE VIEW student_parent_info AS
SELECT 
    s.student_id,
    s.first_name,
    s.last_name,
    s.student_email,
    s.grade_level,
    s.age,
    p.parent_id,
    p.first_name as parent_first_name,
    p.last_name as parent_last_name,
    p.parent_email,
    p.phone_number as parent_phone,
    spr.relationship_type,
    spr.is_primary_contact
FROM students s
LEFT JOIN student_parent_relationships spr ON s.student_id = spr.student_id
LEFT JOIN parents p ON spr.parent_id = p.parent_id
WHERE s.is_active = TRUE AND p.is_active = TRUE;

-- Student grades summary
CREATE VIEW student_grades_summary AS
SELECT 
    s.student_id,
    s.first_name,
    s.last_name,
    s.grade_level,
    c.class_name,
    c.subject,
    COUNT(g.grade_id) as total_assignments,
    AVG(g.percentage) as average_percentage,
    MAX(g.submitted_date) as last_assignment_date
FROM students s
JOIN student_class_enrollments sce ON s.student_id = sce.student_id
JOIN classes c ON sce.class_id = c.class_id
LEFT JOIN grades g ON s.student_id = g.student_id AND c.class_id = g.class_id
WHERE s.is_active = TRUE AND sce.status = 'Active'
GROUP BY s.student_id, c.class_id;

-- =============================================
-- TRIGGERS FOR DATA INTEGRITY
-- =============================================

-- Update student age when date_of_birth changes
DELIMITER //
CREATE TRIGGER update_student_age 
BEFORE UPDATE ON students
FOR EACH ROW
BEGIN
    IF NEW.date_of_birth IS NOT NULL THEN
        SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE());
    END IF;
END//
DELIMITER ;

-- Update student age on insert
DELIMITER //
CREATE TRIGGER set_student_age_on_insert
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    IF NEW.date_of_birth IS NOT NULL THEN
        SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE());
    END IF;
END//
DELIMITER ;
