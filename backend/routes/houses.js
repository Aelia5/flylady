const router = require('express').Router();
const {
  validatePlace,
  validateId,
  validateZoneNumber,
} = require('../middlewares/validate');

const {
  createHouse,
  getMyHouses,
  deleteHouse,
  renameHouse,
  renameZone,
} = require('../controllers/houses');

router.post('/new-house', validatePlace, createHouse);

router.get('/find-my-houses', getMyHouses);

router.delete('/:id', validateId, deleteHouse);

router.patch('/:id', validateId, validatePlace, renameHouse);

router.patch(
  '/:id/:number',
  validateId,
  validateZoneNumber,
  validatePlace,
  renameZone
);

module.exports = router;
