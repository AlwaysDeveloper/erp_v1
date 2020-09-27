const router = require('express').Router();

// const rootAdminController = require('./../controllers/rootAdminController');
const authController = require('../controllers/authController');
const teacherController = require('../controllers/attendenceController');

router.use(authController.protect);
router.use(authController.restrict(2, 3));

router.post('/mark', teacherController.makeAttendence);
router.post('/:id/update', teacherController.updateAttendence);

module.exports = router;
