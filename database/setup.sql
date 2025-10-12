-- Class Roots Database Setup Script
-- Run this script to create and populate the database

-- Create database and use it
CREATE DATABASE IF NOT EXISTS class_roots;
USE class_roots;

-- Source the schema file
SOURCE schema.sql;

-- Source the sample data file
SOURCE sample_data.sql;

-- Display setup completion message
SELECT 'Class Roots database setup completed successfully!' as Status;
