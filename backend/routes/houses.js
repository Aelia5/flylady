const router = require('express').Router();
const { validateName, validateId } = require('../middlewares/validate');

const {
  createHouse, getMyHouses, deleteHouse
} = require('../controllers/houses');

router.post('/newhouse', validateName, createHouse);

router.get('/findmyhouses', getMyHouses)

router.delete('/:id', validateId, deleteHouse);

module.exports = router;
