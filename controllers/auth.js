const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

//  exports.getLogin = (req, res) => {
//     if (req.user) {
//       return res.redirect('/todos')
//     }
//     res.render('login', {
//       title: 'Login'
//     })
//   }

exports.postLogin = (req, res, next) => {
	if (!validator.isEmail(req.body.loginData.email)) {
		res.status(400).json({
			message: {
				msgBody: 'Please enter a valid email address.',
				msgError: true,
			},
		});
		return;
	}
	if (validator.isEmpty(req.body.loginData.password)) {
		res.status(400).json({
			message: {
				msgBody: 'Password cannot be blank.',
				msgError: true,
			},
		});
		return;
	}

	req.body.loginData.email = validator.normalizeEmail(
		req.body.loginData.email,
		{
			gmail_remove_dots: false,
		}
	);

	passport.authenticate('local', (err, user, info) => {
		if (err) {
			res.status(500).json({
				message: {
					msgBody: 'Error has occured during authentication.',
					msgError: true,
					err,
				},
			});
			return;
		}
		if (!user) {
			res.status(500).json({
				message: {
					msgBody: 'Not user.',
					msgError: true,
					err,
				},
			});
			return;
		}
		req.logIn(user, err => {
			if (err) {
				res.status(500).json({
					message: {
						msgBody: 'Log in failed.',
						msgError: true,
						err,
					},
				});
				return;
			}
			res.status(201).json({
				message: {
					msgBody: 'Success! You are logged in.',
					msgError: false,
				},
			});
		});
	})(req, res);
};

exports.logout = (req, res) => {
	req.logout();
	req.session.destroy(err => {
		if (err)
			console.log('Error : Failed to destroy the session during logout.', err);
		req.user = null;
		res.redirect('/');
	});
};

// exports.getSignup = (req, res) => {
//   if (req.user) {
//     return res.redirect('/todos')
//   }
//   res.render('signup', {
//     title: 'Create Account'
//   })
// }

exports.postSignup = (req, res) => {
	if (!validator.isEmail(req.body.signUpData.email)) {
		res.status(400).json({
			message: {
				msgBody: 'Please enter a valid email address.',
				msgError: true,
			},
		});
		return;
	}
	if (!validator.isLength(req.body.signUpData.password, { min: 8 })) {
		res.status(400).json({
			message: {
				msgBody: 'Password must be at least 8 characters long.',
				msgError: true,
			},
		});
		return;
	}

	if (req.body.signUpData.password !== req.body.signUpData.confirmPassword) {
		res.status(400).json({
			message: {
				msgBody: 'Passwords do not match.',
				msgError: true,
			},
		});
		return;
	}

	req.body.signUpData.email = validator.normalizeEmail(
		req.body.signUpData.email,
		{
			gmail_remove_dots: false,
		}
	);

	const user = new User({
		userName: req.body.signUpData.userName,
		email: req.body.signUpData.email,
		password: req.body.signUpData.password,
	});

	User.findOne(
		{
			$or: [
				{ email: req.body.signUpData.email },
				{ userName: req.body.signUpData.userName },
			],
		},
		(err, existingUser) => {
			if (err) {
				res.status(500).json({
					message: {
						msgBody: 'Error has occured during find',
						msgError: true,
						err,
					},
				});
				return;
			}
			if (existingUser) {
				res.status(400).json({
					message: {
						msgBody: 'Username or email already taken.',
						msgError: true,
					},
				});
				return;
			}
			user.save(err => {
				if (err) {
					res.status(500).json({
						message: {
							msgBody: 'Error has occured during save.',
							msgError: true,
							err,
						},
					});
				} else {
					res.status(201).json({
						message: {
							msgBody: 'Account successfully created',
							msgError: false,
						},
					});
				}
			});
		}
	);
};
