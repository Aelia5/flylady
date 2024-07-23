const router = require('express').Router();
const { validatePlace, validateId } = require('../middlewares/validate');

const {
  createHouse,
  getMyHouses,
  deleteHouse,
  renameHouse,
  createRoom,
} = require('../controllers/houses');

router.post('/new-house', validatePlace, createHouse);

router.get('/find-my-houses', getMyHouses);

router.delete('/:id', validateId, deleteHouse);

router.patch('/:id', validateId, validatePlace, renameHouse);

router.patch('/:id/new-room', validateId, validatePlace, createRoom);

module.exports = router;
