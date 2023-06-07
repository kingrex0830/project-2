-- Insert departments
INSERT INTO department (department_name) VALUES
  ('Computer Science'),
  ('Mathematics'),
  ('Physics');

-- Insert courses
INSERT INTO course (course_name, department_id) VALUES
  ('Introduction to Programming', 1),
  ('Calculus I', 2),
  ('Mechanics', 3);

-- Insert students
INSERT INTO student (first_name, last_name, course_id, grade_id) VALUES
  ('John', 'Doe', 1, 1),
  ('Jane', 'Smith', 2, 2),
  ('Michael', 'Johnson', 3, 3),
  ('Emily', 'Brown', 1, 2),
  ('David', 'Taylor', 2, 3),
  ('Olivia', 'Miller', 3, 1);

-- Insert grades
INSERT INTO grades (value, student_id, course_id, department_id) VALUES
  ('A', 1, 1, 1),
  ('B+', 2, 2, 2),
  ('A-', 3, 3, 3),
  ('B', 4, 1, 1),
  ('A', 5, 2, 2),
  ('B', 6, 3, 3);
