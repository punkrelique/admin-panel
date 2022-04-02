export {}
const Router = require('express');
const router = new Router();
const authController = require('../controller/auth.controller');

router.get('/', authController.login)

module.exports = router;