const router = require('express').Router();

// const rootAdminController = require('./../controllers/rootAdminController');
const authController = require('./../controllers/auth.controller');
const specialController = require('./../controllers/specialController');

router.use(authController.protect);
router.get('/getSubject', specialController.getSubject);
router.use(authController.restrict(0, 1, 3));

router.post('/createSubject', specialController.createSubject);
router.get('/:id/deleteSubject', specialController.deleteSubject);
router.post('/:id/updateSubject', specialController.updateSubject);

module.exports = router;
