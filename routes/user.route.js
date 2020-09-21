const router = require('express').Router();

const rootAdminController = require('./../controllers/rootAdminController');
const authController = require('./../controllers/auth.controller');

router.post('/login', authController.login);

router.use(authController.protect);

router.get('/home', (req, res, next) => {
  res.status(200).json({
    status: 'success'
  });
});

router.use(authController.restrict(0, 1));

router.post('/createUser', rootAdminController.createUser);

module.exports = router;
