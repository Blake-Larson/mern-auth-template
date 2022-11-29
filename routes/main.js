const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', authController.serverMessage);
router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);

router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;
