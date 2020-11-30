const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const users = sequelize.define('Users', {
    userID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    roleID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = users;

