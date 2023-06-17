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
});

Course.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: 'course_id',
  otherKey: 'student_id',
});
Student.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'student_id',
  otherKey: 'course_id',
});

Course.hasMany(Grades, {
  foreignKey: 'course_id',
  onDelete: 'CASCADE',
});
Grades.belongsTo(Course, {
  foreignKey: 'course_id',
});

Student.hasMany(Grades, {
  foreignKey: 'student_id',
  onDelete: 'CASCADE',
});
Grades.belongsTo(Student, {
  foreignKey: 'student_id',
});


module.exports = {
  Course,
  Department,
  Enrollment,
  Grades,
  Student,
  User
};

// Checkpoint!!!!! !!!!!!