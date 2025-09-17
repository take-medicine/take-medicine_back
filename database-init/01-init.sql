-- MySQL initialization script
CREATE DATABASE IF NOT EXISTS medicine_test_db;

-- Grant permissions to medicine_user (already created by Docker)
GRANT ALL PRIVILEGES ON medicine_db.* TO 'medicine_user'@'%';
GRANT ALL PRIVILEGES ON medicine_test_db.* TO 'medicine_user'@'%';
FLUSH PRIVILEGES;

SELECT 'Medicine databases created successfully for MySQL' as status;
