const router = require('express').Router();
const {
  validatePlace,
  validateId,
  validateZoneNumber,
  validateZoneOrder,
  validateTask,
} = require('../middlewares/validate');

const {
  createHouse,
  getMyHouses,
  deleteHouse,
  renameHouse,
  renameZone,
  reorderZones,
  addTask,
  deleteTask,
  renameTask,
  completeTask,
} = require('../controllers/houses');

router.post('/new-house', validatePlace, createHouse);

router.get('/find-my-houses', getMyHouses);

router.delete('/:id', validateId, deleteHouse);

router.patch('/:id', validateId, validatePlace, renameHouse);

router.patch('/:id/reorder', validateId, validateZoneOrder, reorderZones);

router.patch(
  '/:id/:zone/',
  validateId,
  validateZoneNumber,
  validatePlace,
  renameZone
);

router.patch(
  '/:id/:zone/new-task',
  validateId,
  validateZoneNumber,
  validateTask,
  addTask
);

router.patch(
  '/:id/:zone/:task/delete',
  validateId,
  validateZoneNumber,
  deleteTask
);

router.patch(
  '/:id/:zone/:task/rename',
  validateId,
  validateZoneNumber,
  validateTask,
  renameTask
);

router.patch(
  '/:id/:zone/complete',
  validateId,
  validateZoneNumber,
  completeTask
);

module.exports = router;
