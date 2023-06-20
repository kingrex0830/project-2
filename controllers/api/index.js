const router = require('express').Router();
const userRoutes = require('./userRoutes');
const departmentRoutes = require('./departmentRoutes');
const courseRoutes = require('./courseRoutes');
const gradesRoutes = require('./gradesRoutes');
const studentRoutes = require('./studentRoutes');
const enrollmentRoutes = require('./enrollmentRoutes');

router.use('/users', userRoutes);
router.use('/departments', departmentRoutes);
router.use('/courses', courseRoutes);
router.use('/grades', gradesRoutes);
router.use('/students', studentRoutes);
router.use('/enrollments', enrollmentRoutes);

module.exports = router;

