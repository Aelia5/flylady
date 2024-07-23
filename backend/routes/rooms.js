const router = require('express').Router();
const {
  validatePlace,
  validateId,
  validateTask,
} = require('../middlewares/validate');

const { deleteRoom, renameRoom, createTask } = require('../controllers/rooms');

router.delete('/:id', validateId, deleteRoom);

router.patch('/:id', validateId, validatePlace, renameRoom);

router.patch('/:id/new-task', validateId, validateTask, createTask);

module.exports = router;
