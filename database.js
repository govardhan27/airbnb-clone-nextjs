const Sequelize = require('sequelize');

const user = 'nextbnb';
const password = '!';
const host = 'localhost';
const database = 'airbnb';

const sequelize = new Sequelize(database, user, password, {
	host,
	dialect: 'postgres'
	// logging: true
});

module.exports = sequelize;
