const router = require('express').Router();
const { validateId, validateTask } = require('../middlewares/validate');

const { deleteTask, editTask } = require('../controllers/tasks');

router.delete('/:id', validateId, deleteTask);

router.patch('/:id', validateId, validateTask, editTask);

module.exports = router;
