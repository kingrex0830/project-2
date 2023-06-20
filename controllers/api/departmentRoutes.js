const router = require('express').Router();
const { Department } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const departments = await Department.findAll();

    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);

    if (!department) {
      res.status(404).json({ message: 'No department found with this id!' });
      return;
    }

    res.status(200).json(department);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const department = await Department.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!department[0]) {
      res.status(404).json({ message: 'No department found with this id!' });
      return;
    }

    res.status(200).json(department);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newDepartment = await Department.create(req.body);

    res.status(200).json(newDepartment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const departmentData = await Department.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!departmentData) {
      res.status(404).json({ message: 'No department found with this id!' });
      return;
    }

    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Added features:
// Get the department ID based on the department name
router.get('/name/:name', async (req, res) => {
  try {
    const department = await Department.findOne({
      where: {
        department_name: req.params.name,
      },
      attributes: ['id'],
    });

    if (!department) {
      res.status(404).json({ message: 'No department found with this name!' });
      return;
    }

    res.status(200).json(department);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

