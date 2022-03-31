const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/user/', userController.getUsers)
router.get('/user/:id', userController.getUserInfo)

module.exports = router;