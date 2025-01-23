const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.init);

router.get('/Login', authController.login_get);

router.post('/Login', authController.login_post);

module.exports = router;