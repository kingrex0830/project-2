const router = require('express').Router();
const { Grades } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const grades = await Grades.findAll();

    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const grade = await Grades.findByPk(req.params.id);

    if (!grade) {
      res.status(404).json({ message: 'No grade found with this id!' });
      return;
    }

    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const grade = await Grades.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!grade[0]) {
      res.status(404).json({ message: 'No grade found with this id!' });
      return;
    }

    res.status(200).json(grade);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newGrade = await Grades.create(req.body);

    res.status(200).json(newGrade);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const gradeData = await Grades.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!gradeData) {
      res.status(404).json({ message: 'No grade found with this id!' });
      return;
    }

    res.status(200).json(gradeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
