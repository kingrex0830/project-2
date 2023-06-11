const seedDepartments = require('./department-seeds');
const seedCourses = require('./course-seeds');
const seedGrades = require('./grades-seeds');
const seedStudents = require('./student-seeds');
const seedEnrollments = require('./enrollment-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedDepartments();
  console.log('\n----- DEPARTMENTS SEEDED -----\n');

  await seedCourses();
  console.log('\n----- COURSES SEEDED -----\n');

  await seedStudents();
  console.log('\n----- STUDENTS SEEDED -----\n');

  await seedGrades();
  console.log('\n----- GRADES SEEDED -----\n');

  await seedEnrollments();
  console.log('\n----- ENROLLMENTS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
