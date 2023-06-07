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
INSERT INTO student (first_name, last_name) VALUES
  ('John', 'Doe'),
  ('Jane', 'Smith'),
  ('Michael', 'Johnson'),
  ('Emily', 'Brown'),
  ('David', 'Taylor'),
  ('Olivia', 'Miller'),
  ('Sophia', 'Anderson');

-- Insert grades
INSERT INTO grades (value, student_id, course_id) VALUES
  ('A', 1, 1),
  ('B+', 1, 2),
  ('A-', 2, 1),
  ('B', 2, 3),
  ('A', 3, 2),
  ('B', 4, 1),
  ('B-', 5, 2),
  ('C', 6, 3),
  ('A', 7, 1),
  ('A+', 7, 2);

-- Insert enrollment
INSERT INTO enrollment (student_id, course_id, grade_id) VALUES
  (1, 1, 1),
  (1, 2, 2),
  (2, 1, 3),
  (2, 3, 4),
  (3, 2, 5),
  (4, 1, 6),
  (5, 2, 7),
  (6, 3, 8),
  (7, 1, 9),
  (7, 2, 10);