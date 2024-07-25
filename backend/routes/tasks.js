const router = require('express').Router();
const { validateId, validateTask } = require('../middlewares/validate');

const { deleteTask, editTask, setLast } = require('../controllers/tasks');

router.delete('/:id', validateId, deleteTask);

router.patch('/:id', validateId, validateTask, editTask);

router.patch('/:id/done', validateId, setLast);

module.exports = router;
