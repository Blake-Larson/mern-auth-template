const express = require('express');
const mainRouter = express.Router();
const userController = require('../controllers/user');
const passport = require('passport');
const passportConfig = require('../passport');

mainRouter.post('/signup', userController.signUpUser);
mainRouter.post(
	'/login',
	passport.authenticate('local', { session: false }),
	userController.login
);
mainRouter.post(
	'/logout',
	passport.authenticate('jwt', { session: false }),
	userController.logout
);

mainRouter.get(
	'/admin',
	passport.authenticate('jwt', { session: false }),
	userController.getAdmin
);
mainRouter.get(
	'/authenticated',
	passport.authenticate('jwt', { session: false }),
	userController.getAuthenticated
);

module.exports = mainRouter;
