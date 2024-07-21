const router = require('express').Router();
const { validateName, validateId } = require('../middlewares/validate');

const {
  createHouse,
  getMyHouses,
  deleteHouse,
  updateHouse,
  createRoom,
} = require('../controllers/houses');

router.post('/newhouse', validateName, createHouse);

router.get('/findmyhouses', getMyHouses);

router.delete('/:id', validateId, deleteHouse);

router.patch('/:id', validateId, validateName, updateHouse);

router.patch('/:id/newroom', validateId, validateName, createRoom);

module.exports = router;
