module.exports = {
	ensureAuth: function (req, res, next) {
		const { user } = req.session;
		if (user) {
			return res.status(200).json({ message: 'Authorized' });
		} else {
			return res.status(401).json({ message: 'Unathorized' });
		}
		next();
	},
	ensureGuest: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/dashboard');
		}
	},
};

// ensureAuth: function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   } else {
//     res.redirect('/')
//   }
// },
