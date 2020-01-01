const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

/**
 * serializeUser and deserializeUser, is usedto instruct Passport what is the data
 * we want to send to the client,
 * and how to retrieve our users from the database, given the user information
 */

passport.serializeUser((user, done) => done(null, user.email));

passport.deserializeUser(async (email, done) => {
	const user = await User.findOne({ where: { email } });
	done(null, user);
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			if (!email || !password) {
				done('Email and password is required');
				return;
			}

			const user = await User.findOne({ where: { email } });

			if (!user) {
				done('User not found', null);
			}
			const valid = await user.isPasswordValid(password);
			if (!valid) {
				done('Email and password dont match', null);
			}

			done(null, user);
		}
	)
);
