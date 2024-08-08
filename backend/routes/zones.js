const router = require('express').Router();
const { validateId, validateTask } = require('../middlewares/validate');

const { createTask } = require('../controllers/zones');

router.patch('/:id/new-task', validateId, validateTask, createTask);

module.exports = router;
