const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../database');

class User extends Sequelize.Model {}

User.init(
	{
		email: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'user',
		timestamps: false,
		hooks: {
			beforeCreate: async user => {
				const saltRounds = 10;
				const salt = await bcrypt.genSalt(saltRounds);
				user.password = await bcrypt.hash(user.password, salt);
			}
		}
	}
);

User.prototype.isPasswordValid = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = User;
