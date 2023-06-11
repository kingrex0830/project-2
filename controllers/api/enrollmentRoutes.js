const router = require('express').Router();
const { Enrollment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();

    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      res.status(404).json({ message: 'No enrollment found with this id!' });
      return;
    }

    res.status(200).json(enrollment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const enrollment = await Enrollment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!enrollment[0]) {
      res.status(404).json({ message: 'No enrollment found with this id!' });
      return;
    }

    res.status(200).json(enrollment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newEnrollment = await Enrollment.create(req.body);

    res.status(200).json(newEnrollment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const enrollmentData = await Enrollment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!enrollmentData) {
      res.status(404).json({ message: 'No enrollment found with this id!' });
      return;
    }

    res.status(200).json(enrollmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
