const router = require('express').Router();

const rootAdminController = require('./../controllers/rootAdminController');
const authController = require('./../controllers/auth.controller');
const homeController = require('./../controllers/homeController');

router.post('/login', authController.login);

router.use(authController.protect);

router.get('/home', homeController.homeData);

// restricted routes for root and admin
router.use(authController.restrict(0, 1));

router.post('/createAccount', rootAdminController.createUser);

module.exports = router;
