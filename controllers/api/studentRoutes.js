const router = require('express').Router();
const { Student } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      res.status(404).json({ message: 'No student found with this id!' });
      return;
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const student = await Student.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!student[0]) {
      res.status(404).json({ message: 'No student found with this id!' });
      return;
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(200).json(newStudent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const studentData = await Student.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!studentData) {
      res.status(404).json({ message: 'No student found with this id!' });
      return;
    }

    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
