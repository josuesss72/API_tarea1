const {DataTypes} = require("sequelize");
const {db} = require("../database/db");

const Repairs = db.define('repairs', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true
	},
	date: {
		type: DataTypes.STRING,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending',
		enum: ['pending', 'completed', 'cancelled']
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
})

module.exports = {
	Repairs
}
