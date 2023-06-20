const router = require('express').Router();
const { Course } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      res.status(404).json({ message: 'No course found with this id!' });
      return;
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const course = await Course.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!course[0]) {
      res.status(404).json({ message: 'No course found with this id!' });
      return;
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);

    res.status(200).json(newCourse);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const courseData = await Course.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!courseData) {
      res.status(404).json({ message: 'No course found with this id!' });
      return;
    }

    res.status(200).json(courseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
