const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = userID => {
	return JWT.sign(
		{
			iss: 'Pupdisc',
			sub: userID,
		},
		'Pupdisc',
		{ expiresIn: '1h' }
	);
};

module.exports = {
	signUpUser: async (req, res) => {
		const { username, email, password } = req.body;
		await User.findOne({ username }, async (err, user) => {
			if (err)
				res.status(500).json({
					message: { msgBody: 'Error has occured', msgError: true, err },
				});
			if (user)
				res.status(400).json({
					message: { msgBody: 'Username is already taken', msgError: true },
				});
			else {
				const newUser = await new User({ username, email, password });
				newUser.save(err => {
					if (err)
						res.status(500).json({
							message: { msgBody: 'Error has occured', msgError: true, err },
						});
					else
						res.status(201).json({
							message: {
								msgBody: 'Account successfully created',
								msgError: false,
							},
						});
				});
			}
		});
	},
	login: async (req, res) => {
		if (req.isAuthenticated()) {
			const { _id, username, role, todos, projects } = req.user;
			const token = signToken(_id);
			res.cookie('access_token', token, { httpOnly: true, sameSite: true });
			res.status(200).json({
				isAuthenticated: true,
				user: { username, role, todos, projects },
			});
		}
	},
	logout: async (req, res) => {
		console.log('controller logout...');
		res.clearCookie('access_token');
		res.json({ user: { username: '', role: '' }, success: true });
	},
	// getAdmin: async (req, res) => {
	// 	if (req.user.role === 'admin') {
	// 		res
	// 			.status(200)
	// 			.json({ message: { msgBody: 'You are an admin', msgError: false } });
	// 	} else
	// 		res
	// 			.status(403)
	// 			.json({ message: { msgBody: 'You are not an admin', msgError: true } });
	// },
	getAuthenticated: async (req, res) => {
		const { username, role } = req.user;
		res.status(200).json({ isAuthenticated: true, user: { username, role } });
	},
};
