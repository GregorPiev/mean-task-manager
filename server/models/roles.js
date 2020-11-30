const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const roles = sequelize.define('Roles', {
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
});
module.exports = roles;




