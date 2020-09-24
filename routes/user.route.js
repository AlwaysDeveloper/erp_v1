const router = require('express').Router();

const rootAdminController = require('./../controllers/rootAdminController');
const authController = require('./../controllers/auth.controller');
const homeController = require('./../controllers/homeController');

router.post('/login', authController.login);

router.use(authController.protect);

router.get('/home', homeController.homeData);

router.use(authController.restrict(0, 1));

router.post('/createUser', rootAdminController.createUser);

module.exports = router;
