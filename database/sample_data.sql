-- Class Roots Sample Data
-- Insert sample data for testing the database

USE class_roots;

-- =============================================
-- SAMPLE TEACHERS
-- =============================================
INSERT INTO teachers (first_name, last_name, teacher_email, phone_number, address, subject_specialization, grade_levels_taught, room_number, hire_date, salary) VALUES
('Sarah', 'Johnson', 'sarah.johnson@classroots.edu', '555-0101', '123 Teacher Lane, Education City, EC 12345', 'Elementary Education', 'K,1,2', 'Room 101', '2020-08-15', 45000.00),
('Michael', 'Chen', 'michael.chen@classroots.edu', '555-0102', '456 Educator Ave, Education City, EC 12345', 'Mathematics', '3,4,5', 'Room 102', '2019-09-01', 48000.00),
('Emily', 'Rodriguez', 'emily.rodriguez@classroots.edu', '555-0103', '789 Learning St, Education City, EC 12345', 'Science', '6,7,8', 'Room 103', '2021-08-20', 50000.00),
('David', 'Thompson', 'david.thompson@classroots.edu', '555-0104', '321 Knowledge Blvd, Education City, EC 12345', 'English Language Arts', '4,5,6', 'Room 104', '2018-08-01', 47000.00),
('Lisa', 'Williams', 'lisa.williams@classroots.edu', '555-0105', '654 School Rd, Education City, EC 12345', 'Social Studies', '7,8', 'Room 105', '2022-01-15', 49000.00);

-- =============================================
-- SAMPLE ADMINISTRATORS
-- =============================================
INSERT INTO administrators (first_name, last_name, admin_email, phone_number, address, position_title, department, access_level, hire_date, salary) VALUES
('Robert', 'Anderson', 'robert.anderson@classroots.edu', '555-0201', '100 Admin Plaza, Education City, EC 12345', 'Principal', 'Administration', 'Super Admin', '2015-07-01', 75000.00),
('Jennifer', 'Martinez', 'jennifer.martinez@classroots.edu', '555-0202', '200 Management Dr, Education City, EC 12345', 'Vice Principal', 'Administration', 'Principal', '2017-08-15', 65000.00),
('Kevin', 'Brown', 'kevin.brown@classroots.edu', '555-0203', '300 Leadership Way, Education City, EC 12345', 'IT Director', 'Technology', 'Department Head', '2019-06-01', 60000.00),
('Amanda', 'Davis', 'amanda.davis@classroots.edu', '555-0204', '400 Support St, Education City, EC 12345', 'Student Services Coordinator', 'Student Services', 'Staff', '2020-08-01', 45000.00);

-- =============================================
-- SAMPLE PARENTS
-- =============================================
INSERT INTO parents (first_name, last_name, parent_email, phone_number, address, relationship_to_student, emergency_contact, preferred_contact_method) VALUES
('John', 'Smith', 'john.smith@email.com', '555-1001', '100 Family Ave, Parent City, PC 54321', 'Father', TRUE, 'Email'),
('Mary', 'Smith', 'mary.smith@email.com', '555-1002', '100 Family Ave, Parent City, PC 54321', 'Mother', FALSE, 'Phone'),
('Robert', 'Johnson', 'robert.johnson@email.com', '555-1003', '200 Parent St, Parent City, PC 54321', 'Father', TRUE, 'Text'),
('Susan', 'Johnson', 'susan.johnson@email.com', '555-1004', '200 Parent St, Parent City, PC 54321', 'Mother', FALSE, 'Email'),
('Michael', 'Brown', 'michael.brown@email.com', '555-1005', '300 Guardian Blvd, Parent City, PC 54321', 'Guardian', TRUE, 'Phone'),
('Sarah', 'Davis', 'sarah.davis@email.com', '555-1006', '400 Care Lane, Parent City, PC 54321', 'Mother', TRUE, 'Email'),
('James', 'Wilson', 'james.wilson@email.com', '555-1007', '500 Support Rd, Parent City, PC 54321', 'Father', FALSE, 'Text'),
('Jennifer', 'Wilson', 'jennifer.wilson@email.com', '555-1008', '500 Support Rd, Parent City, PC 54321', 'Mother', TRUE, 'Email');

-- =============================================
-- SAMPLE STUDENTS
-- =============================================
INSERT INTO students (first_name, last_name, student_email, phone_number, address, grade_level, age, date_of_birth, emergency_contact_name, emergency_contact_phone, medical_notes, enrollment_date) VALUES
('Emma', 'Smith', 'emma.smith@student.classroots.edu', NULL, '100 Family Ave, Parent City, PC 54321', '3', 8, '2016-03-15', 'John Smith', '555-1001', 'No known allergies', '2023-08-20'),
('Liam', 'Smith', 'liam.smith@student.classroots.edu', NULL, '100 Family Ave, Parent City, PC 54321', '5', 10, '2014-07-22', 'Mary Smith', '555-1002', 'Mild asthma - inhaler available', '2023-08-20'),
('Olivia', 'Johnson', 'olivia.johnson@student.classroots.edu', NULL, '200 Parent St, Parent City, PC 54321', '2', 7, '2017-11-08', 'Robert Johnson', '555-1003', 'No known allergies', '2023-08-20'),
('Noah', 'Johnson', 'noah.johnson@student.classroots.edu', NULL, '200 Parent St, Parent City, PC 54321', '6', 11, '2013-01-30', 'Susan Johnson', '555-1004', 'No known allergies', '2023-08-20'),
('Ava', 'Brown', 'ava.brown@student.classroots.edu', NULL, '300 Guardian Blvd, Parent City, PC 54321', '4', 9, '2015-05-12', 'Michael Brown', '555-1005', 'No known allergies', '2023-08-20'),
('William', 'Davis', 'william.davis@student.classroots.edu', NULL, '400 Care Lane, Parent City, PC 54321', '7', 12, '2012-09-18', 'Sarah Davis', '555-1006', 'No known allergies', '2023-08-20'),
('Sophia', 'Wilson', 'sophia.wilson@student.classroots.edu', NULL, '500 Support Rd, Parent City, PC 54321', '1', 6, '2018-12-03', 'James Wilson', '555-1007', 'No known allergies', '2023-08-20'),
('James', 'Wilson', 'james.wilson@student.classroots.edu', NULL, '500 Support Rd, Parent City, PC 54321', '8', 13, '2011-04-25', 'Jennifer Wilson', '555-1008', 'No known allergies', '2023-08-20'),
('Isabella', 'Miller', 'isabella.miller@student.classroots.edu', NULL, '600 Learning Dr, Parent City, PC 54321', 'K', 5, '2019-08-14', 'Thomas Miller', '555-1009', 'No known allergies', '2023-08-20'),
('Benjamin', 'Garcia', 'benjamin.garcia@student.classroots.edu', NULL, '700 Education Way, Parent City, PC 54321', '3', 8, '2016-02-28', 'Maria Garcia', '555-1010', 'No known allergies', '2023-08-20');

-- =============================================
-- STUDENT-PARENT RELATIONSHIPS
-- =============================================
INSERT INTO student_parent_relationships (student_id, parent_id, relationship_type, is_primary_contact) VALUES
-- Emma Smith (student_id: 1) - John & Mary Smith (parent_id: 1, 2)
(1, 1, 'Primary', TRUE),
(1, 2, 'Secondary', FALSE),
-- Liam Smith (student_id: 2) - John & Mary Smith (parent_id: 1, 2)
(2, 1, 'Primary', TRUE),
(2, 2, 'Secondary', FALSE),
-- Olivia Johnson (student_id: 3) - Robert & Susan Johnson (parent_id: 3, 4)
(3, 3, 'Primary', TRUE),
(3, 4, 'Secondary', FALSE),
-- Noah Johnson (student_id: 4) - Robert & Susan Johnson (parent_id: 3, 4)
(4, 3, 'Primary', TRUE),
(4, 4, 'Secondary', FALSE),
-- Ava Brown (student_id: 5) - Michael Brown (parent_id: 5)
(5, 5, 'Primary', TRUE),
-- William Davis (student_id: 6) - Sarah Davis (parent_id: 6)
(6, 6, 'Primary', TRUE),
-- Sophia Wilson (student_id: 7) - James & Jennifer Wilson (parent_id: 7, 8)
(7, 7, 'Primary', TRUE),
(7, 8, 'Secondary', FALSE),
-- James Wilson (student_id: 8) - James & Jennifer Wilson (parent_id: 7, 8)
(8, 7, 'Primary', TRUE),
(8, 8, 'Secondary', FALSE);

-- =============================================
-- SAMPLE CLASSES
-- =============================================
INSERT INTO classes (class_name, subject, grade_level, teacher_id, room_number, semester, school_year, max_students) VALUES
('Kindergarten Basics', 'General Education', 'K', 1, 'Room 101', 'Fall', '2024-2025', 20),
('Grade 1 Fundamentals', 'General Education', '1', 1, 'Room 101', 'Fall', '2024-2025', 22),
('Grade 2 Explorers', 'General Education', '2', 1, 'Room 101', 'Fall', '2024-2025', 24),
('Grade 3 Math', 'Mathematics', '3', 2, 'Room 102', 'Fall', '2024-2025', 25),
('Grade 4 Math', 'Mathematics', '4', 2, 'Room 102', 'Fall', '2024-2025', 25),
('Grade 5 Math', 'Mathematics', '5', 2, 'Room 102', 'Fall', '2024-2025', 25),
('Grade 4 English', 'English Language Arts', '4', 4, 'Room 104', 'Fall', '2024-2025', 25),
('Grade 5 English', 'English Language Arts', '5', 4, 'Room 104', 'Fall', '2024-2025', 25),
('Grade 6 English', 'English Language Arts', '6', 4, 'Room 104', 'Fall', '2024-2025', 25),
('Grade 6 Science', 'Science', '6', 3, 'Room 103', 'Fall', '2024-2025', 25),
('Grade 7 Science', 'Science', '7', 3, 'Room 103', 'Fall', '2024-2025', 25),
('Grade 8 Science', 'Science', '8', 3, 'Room 103', 'Fall', '2024-2025', 25),
('Grade 7 Social Studies', 'Social Studies', '7', 5, 'Room 105', 'Fall', '2024-2025', 25),
('Grade 8 Social Studies', 'Social Studies', '8', 5, 'Room 105', 'Fall', '2024-2025', 25);

-- =============================================
-- STUDENT-CLASS ENROLLMENTS
-- =============================================
INSERT INTO student_class_enrollments (student_id, class_id, enrollment_date, status) VALUES
-- Isabella Miller (K) - Kindergarten Basics
(9, 1, '2024-08-20', 'Active'),
-- Sophia Wilson (1) - Grade 1 Fundamentals
(7, 2, '2024-08-20', 'Active'),
-- Olivia Johnson (2) - Grade 2 Explorers
(3, 3, '2024-08-20', 'Active'),
-- Emma Smith (3) - Grade 3 Math
(1, 4, '2024-08-20', 'Active'),
-- Benjamin Garcia (3) - Grade 3 Math
(10, 4, '2024-08-20', 'Active'),
-- Ava Brown (4) - Grade 4 Math, Grade 4 English
(5, 5, '2024-08-20', 'Active'),
(5, 7, '2024-08-20', 'Active'),
-- Liam Smith (5) - Grade 5 Math, Grade 5 English
(2, 6, '2024-08-20', 'Active'),
(2, 8, '2024-08-20', 'Active'),
-- Noah Johnson (6) - Grade 6 English, Grade 6 Science
(4, 9, '2024-08-20', 'Active'),
(4, 10, '2024-08-20', 'Active'),
-- William Davis (7) - Grade 7 Science, Grade 7 Social Studies
(6, 11, '2024-08-20', 'Active'),
(6, 13, '2024-08-20', 'Active'),
-- James Wilson (8) - Grade 8 Science, Grade 8 Social Studies
(8, 12, '2024-08-20', 'Active'),
(8, 14, '2024-08-20', 'Active');

-- =============================================
-- SAMPLE GRADES
-- =============================================
INSERT INTO grades (student_id, class_id, assignment_name, assignment_type, points_earned, points_possible, due_date, submitted_date, teacher_notes) VALUES
-- Emma Smith (Grade 3 Math)
(1, 4, 'Addition and Subtraction Quiz', 'Quiz', 18, 20, '2024-09-15', '2024-09-15', 'Great work!'),
(1, 4, 'Multiplication Practice', 'Homework', 15, 15, '2024-09-20', '2024-09-19', 'Perfect score!'),
(1, 4, 'Chapter 2 Test', 'Test', 42, 50, '2024-09-25', '2024-09-25', 'Good effort, review fractions'),

-- Liam Smith (Grade 5 Math)
(2, 6, 'Fractions Worksheet', 'Homework', 12, 15, '2024-09-16', '2024-09-16', 'Needs more practice'),
(2, 6, 'Decimals Quiz', 'Quiz', 16, 20, '2024-09-22', '2024-09-22', 'Good understanding'),
(2, 6, 'Geometry Test', 'Test', 38, 45, '2024-09-28', '2024-09-28', 'Solid performance'),

-- Ava Brown (Grade 4 Math)
(5, 5, 'Multiplication Tables', 'Quiz', 20, 20, '2024-09-14', '2024-09-14', 'Excellent!'),
(5, 5, 'Word Problems', 'Homework', 14, 15, '2024-09-18', '2024-09-18', 'Very good'),
(5, 5, 'Division Test', 'Test', 44, 50, '2024-09-24', '2024-09-24', 'Great job!'),

-- Noah Johnson (Grade 6 Science)
(4, 10, 'Solar System Project', 'Project', 45, 50, '2024-09-20', '2024-09-20', 'Creative presentation'),
(4, 10, 'Planet Quiz', 'Quiz', 18, 20, '2024-09-26', '2024-09-26', 'Well prepared'),
(4, 10, 'Ecosystems Test', 'Test', 41, 50, '2024-10-02', '2024-10-02', 'Good understanding'),

-- William Davis (Grade 7 Science)
(6, 11, 'Lab Report - Chemistry', 'Project', 48, 50, '2024-09-18', '2024-09-18', 'Excellent analysis'),
(6, 11, 'Periodic Table Quiz', 'Quiz', 19, 20, '2024-09-25', '2024-09-25', 'Perfect!'),
(6, 11, 'Chemistry Test', 'Test', 46, 50, '2024-10-01', '2024-10-01', 'Outstanding work'),

-- James Wilson (Grade 8 Science)
(8, 12, 'Physics Lab', 'Project', 47, 50, '2024-09-22', '2024-09-22', 'Great experimental design'),
(8, 12, 'Forces and Motion Quiz', 'Quiz', 17, 20, '2024-09-28', '2024-09-28', 'Good grasp of concepts'),
(8, 12, 'Physics Test', 'Test', 43, 50, '2024-10-03', '2024-10-03', 'Solid understanding');

-- =============================================
-- SAMPLE BEHAVIOR SCORES
-- =============================================
INSERT INTO behavior_scores (student_id, class_id, teacher_id, behavior_type, behavior_category, behavior_description, score, date_occurred, teacher_notes, parent_notified) VALUES
-- Emma Smith - Positive behaviors
(1, 4, 2, 'Positive', 'Participation', 'Volunteered to help a struggling classmate with math problems', 5, '2024-09-16', 'Shows great leadership and empathy', FALSE),
(1, 4, 2, 'Positive', 'Following Directions', 'Followed all instructions perfectly during group work', 5, '2024-09-20', 'Always attentive and focused', FALSE),

-- Liam Smith - Mixed behaviors
(2, 6, 2, 'Positive', 'Respect', 'Helped clean up classroom without being asked', 4, '2024-09-18', 'Shows responsibility and respect', FALSE),
(2, 6, 2, 'Negative', 'Classwork', 'Did not complete homework assignment on time', 2, '2024-09-22', 'Needs to improve time management', TRUE),

-- Ava Brown - Positive behaviors
(5, 5, 2, 'Positive', 'Cooperation', 'Worked well with group members on project', 5, '2024-09-19', 'Excellent team player', FALSE),
(5, 5, 2, 'Positive', 'Participation', 'Asked thoughtful questions during lesson', 5, '2024-09-23', 'Very engaged in learning', FALSE),

-- Noah Johnson - Positive behaviors
(4, 10, 3, 'Positive', 'Safety', 'Followed all safety protocols during science experiment', 5, '2024-09-21', 'Sets good example for others', FALSE),
(4, 10, 3, 'Positive', 'Responsibility', 'Remembered to bring all required materials', 4, '2024-09-25', 'Very organized and prepared', FALSE),

-- William Davis - Positive behaviors
(6, 11, 3, 'Positive', 'Participation', 'Led class discussion on environmental issues', 5, '2024-09-20', 'Shows strong leadership skills', FALSE),
(6, 11, 3, 'Positive', 'Respect', 'Listened attentively to other students presentations', 5, '2024-09-26', 'Very respectful of others', FALSE),

-- James Wilson - Positive behaviors
(8, 12, 3, 'Positive', 'Following Directions', 'Completed complex lab procedure independently', 5, '2024-09-24', 'Excellent attention to detail', FALSE),
(8, 12, 3, 'Positive', 'Cooperation', 'Helped set up equipment for entire class', 5, '2024-09-30', 'Very helpful and considerate', FALSE);

-- =============================================
-- SAMPLE COMMUNICATION LOG
-- =============================================
INSERT INTO communication_log (sender_id, sender_type, recipient_id, recipient_type, student_id, subject, message, communication_type, priority, status) VALUES
-- Teacher to Parent communications
(2, 'Teacher', 1, 'Parent', 1, 'Emma\'s Math Progress', 'Emma is doing excellent work in math class. She has shown great improvement in multiplication and is always willing to help her classmates.', 'Email', 'Low', 'Read'),
(2, 'Teacher', 2, 'Parent', 2, 'Liam\'s Homework Concerns', 'I wanted to reach out about Liam\'s recent homework completion. He missed the last assignment and I wanted to check if there are any issues we should address.', 'Phone', 'Medium', 'Delivered'),
(3, 'Teacher', 5, 'Parent', 5, 'Ava\'s Science Project', 'Ava did an outstanding job on her science project presentation. Her creativity and understanding of the material was impressive.', 'Email', 'Low', 'Read'),
(3, 'Teacher', 6, 'Parent', 6, 'William\'s Leadership', 'William has been showing excellent leadership qualities in class. He often helps other students and leads group discussions.', 'Email', 'Low', 'Sent'),
(3, 'Teacher', 8, 'Parent', 8, 'James\'s Lab Work', 'James demonstrated excellent understanding of physics concepts in today\'s lab. His experimental design was very thoughtful.', 'Email', 'Low', 'Sent'),

-- Parent to Teacher communications
(1, 'Parent', 2, 'Teacher', 1, 'Thank you for the update', 'Thank you for letting us know about Emma\'s progress. We\'re so proud of her!', 'Email', 'Low', 'Read'),
(2, 'Parent', 2, 'Teacher', 2, 'Re: Liam\'s Homework', 'Thank you for reaching out. We\'ve been having some family issues that affected Liam\'s routine. We\'ll work on getting him back on track.', 'Phone', 'Medium', 'Read'),
(5, 'Parent', 2, 'Teacher', 5, 'Ava\'s Science Interest', 'Ava has been talking non-stop about science class at home. Thank you for making it so engaging!', 'Email', 'Low', 'Read'),

-- Admin communications
(1, 'Admin', 2, 'Teacher', NULL, 'Staff Meeting Reminder', 'Don\'t forget about our monthly staff meeting tomorrow at 3 PM in the conference room.', 'Email', 'Medium', 'Read'),
(2, 'Admin', 3, 'Teacher', NULL, 'Science Equipment Update', 'The new science equipment has arrived and is ready for use in your classroom.', 'Email', 'Low', 'Sent');
 