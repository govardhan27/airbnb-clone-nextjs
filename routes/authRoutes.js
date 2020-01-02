const passport = require('passport');

const User = require('../models/user');

const authRouteHandler = server => {
	// Register User route handler
	server.post('/api/auth/register', async (req, res) => {
		if (req.method !== 'POST') {
			res.status(405).end(); // Method not allowed
			return;
		}
		const { email, password, passwordconfirmation } = req.body;
		if (password !== passwordconfirmation) {
			res.end(
				JSON.stringify({
					status: 'error',
					message: 'Password dont match',
				})
			);
			return;
		}

		try {
			const user = await User.create({ email, password });
			// below method instructs passport to create session
			req.login(user, err => {
				if (err) {
					res.statusCode = 500;
					res.end(JSON.stringify({ status: 'error', message: err }));
					return;
				}
				res.end(JSON.stringify({ status: 'success', message: 'Logged in' }));
			});
		} catch (err) {
			res.statusCode = 500;
			let message = 'An error occured';
			if (err.name === 'SequelizeUniqueConstraintError') {
				message = 'User already exists';
			}
			res.end(JSON.stringify({ status: 'error', message }));
		}
	});
	// Login User
	server.post('/api/auth/login', (req, res, next) => {
		// eslint-disable-next-line no-unused-vars
		passport.authenticate('local', (err, user) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ status: 'error', message: err }));
				return;
			}

			if (!user) {
				res.statusCode = 500;
				res.end(
					JSON.stringify({
						status: 'error',
						message: 'No user matching credentials',
					})
				);
				return;
			}

			req.login(user, error => {
				if (error) {
					res.statusCode = 500;
					res.end({ status: 'error', message: error });
					return;
				}
				res.end(JSON.stringify({ status: 'success', message: 'logged in' }));
			});
		})(req, res, next);
	});

	// logout User
	server.post('/api/auth/logout', (req, res) => {
		req.logout();
		req.session.destroy();
		res.end(JSON.stringify({ status: 'success', message: 'logged out' }));
	});
};

module.exports = authRouteHandler;
