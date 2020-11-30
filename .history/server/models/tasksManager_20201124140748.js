const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

module.exports = sequelize.define('Roles', {
    roleId: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

