const router = require('express').Router();
const {
  validatePlace,
  validateId,
  validateTask,
} = require('../middlewares/validate');

const { renameZone, createTask } = require('../controllers/zones');

router.patch('/:id', validateId, validatePlace, renameZone);

router.patch('/:id/new-task', validateId, validateTask, createTask);

module.exports = router;
