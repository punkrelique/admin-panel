const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/users/:userType?', userController.getUsers)
router.get('/users/id/:id', userController.getUserByID)
router.get('/users/email/:email:userType?', userController.getUsersByEmail)

module.exports = router;