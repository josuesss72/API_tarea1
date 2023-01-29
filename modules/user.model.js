const {DataTypes} = require("sequelize");
const {db} = require("../database/db");

const User = db.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'client',
		enum: ['client', 'employee']
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'available',
		enum: ['available', 'disabled']	
	}
})

module.exports = {
	User
}
