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
    course_name: 'Magic of Numbers',
    description: 'Introducing students to the magical side of math',
    department_id: 2,
  },
  {
    course_name: 'Mechanics',
    description: 'Introducing students to the basics of Mechanics',
    department_id: 3,
  },
  {
    course_name: 'Biology of the Human Body',
    description: 'Introducing students to the basics of biological structures in the human body',
    department_id: 4,
  },
  {
    course_name: 'Chemistry 101',
    description: 'Introducing students to the basics of chemistry',
    department_id: 5,
  },
  // Add more course data HERE
];

const seedCourses = () => Course.bulkCreate(courseData);

module.exports = seedCourses;
