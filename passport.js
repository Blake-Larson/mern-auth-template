const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

require('dotenv').config({ path: './.env' });

const cookieExtractor = req => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies['access_token'];
	}
	return token;
};

// Authorization
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: 'Pupdisc',
		},
		(payload, done) => {
			User.findById({ _id: payload.sub }, (err, user) => {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else return done(null, false);
			});
		}
	)
);

// Authenticated Local Strategy using username and password
passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			// check if password is correct
			user.comparePassword(password, done);
		});
	})
);
