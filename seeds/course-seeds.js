const { Course } = require('../models');

const courseData = [
  {
    course_name: 'Introduction to Computer Science',
    description: 'Introducing students to the basics of Computer Science',
    department_id: 1,
  },
  {
    course_name: 'Calculus',
    description: 'Introducing students to the basics of Calculus',
    department_id: 2,
  },
  {
    course_name: 'Mechanics',
    description: 'Introducing students to the basics of Mechanics',
    department_id: 3,
  },
  // Add more course data HERE
];

const seedCourses = () => Course.bulkCreate(courseData);

module.exports = seedCourses;