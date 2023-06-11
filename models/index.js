const Course = require('./Course');
const Department = require('./Department');
const Enrollment = require('./Enrollment');
const Grades = require('./Grades');
const Student = require('./Student');
const User = require('./User');

// Define associations
Department.hasMany(Course, {
  foreignKey: 'department_id',
  onDelete: 'CASCADE',
});
Course.belongsTo(Department, {
  foreignKey: 'department_id',
  onDelete: 'CASCADE',
});

Course.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: 'course_id',
  onDelete: 'CASCADE',
});
Student.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'student_id',
  onDelete: 'CASCADE',
});

Course.belongsToMany(Grades, {
  through: Enrollment,
  foreignKey: 'course_id',
  onDelete: 'CASCADE',
});
Grades.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'course_id',
  onDelete: 'CASCADE',
});

Student.belongsToMany(Grades, {
  through: Enrollment,
  foreignKey: 'student_id',
  onDelete: 'CASCADE',
});
Grades.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: 'student_id',
  onDelete: 'CASCADE',
});

module.exports = {
  Course,
  Department,
  Enrollment,
  Grades,
  Student,
  User
};

