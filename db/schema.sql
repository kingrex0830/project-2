DROP DATABASE IF EXISTS studentManager_DB;
CREATE DATABASE studentManager_DB;

USE studentManager_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE course (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(30) NOT NULL,
  department_id INT,

  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE student (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  course_id INT,
  grade_id INT,
  
  FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
  FOREIGN KEY (grade_id) REFERENCES grade(id) ON DELETE CASCADE
);

CREATE TABLE grades (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  value VARCHAR(30) NOT NULL,
  student_id INT,
  course_id INT,
  department_id INT,

  FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);