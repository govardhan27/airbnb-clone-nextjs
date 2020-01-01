const express = require('express');
const next = require('next');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bodyParser = require('body-parser');

const sequelize = require('./database');
const User = require('./models/user');
const authRouteHandler = require('./routes/authRoutes');
require('./services/passport');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

//Storing the session in postgres
const sessionStore = new SequelizeStore({
	db: sequelize
});
// sessionStore.sync();  //creates a seperate table

nextApp.prepare().then(() => {
	const server = express();

	server.use(bodyParser.json());
	//telling express to use express-session
	server.use(
		session({
			secret: '343ji43j4n3jn4jk3n', //random string
			resave: false,
			saveUninitialized: true,
			name: 'airbnb',
			cookie: {
				secure: false, //CRITICAL on localhost
				maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
			},
			store: sessionStore
		}),
		passport.initialize(),
		passport.session()
	);

	//Routes or Request handlers
	authRouteHandler(server);

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
