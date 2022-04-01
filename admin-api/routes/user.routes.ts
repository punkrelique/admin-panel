const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const contentController = require('../controller/content.controller');

router.get('/users/', userController.getUsers)
router.get('/users/id/:id', userController.getUserByID)
router.get('/users/email/:email', userController.getUsersByEmail)

module.exports = router;