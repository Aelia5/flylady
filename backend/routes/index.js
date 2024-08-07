const router = require('express').Router();
const userRouter = require('./users');
const taskRouter = require('./tasks');
const {
  validateUserName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validate');

const houseRouter = require('./houses');
const zoneRouter = require('./zones');
const { auth } = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateEmail, validatePassword, login);
router.post(
  '/signup',
  validateUserName,
  validateEmail,
  validatePassword,
  createUser
);
router.use(auth);
router.use('/users', userRouter);
router.use('/houses', houseRouter);
router.use('/zones', zoneRouter);
router.use('/tasks', taskRouter);
router.use('*', (req, res, next) => {
  const error = new NotFoundError('Страница по указанному маршруту не найдена');
  next(error);
});

module.exports = router;
