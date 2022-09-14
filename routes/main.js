const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

//trying to use a get request to serve react with an 'Authenticated' message.
// router.get(
// 	'/authenticated',
// 	passport.authenticate('local', { session: false }),
// 	authController.getAuthenticated
// );

module.exports = router;
