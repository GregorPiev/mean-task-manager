const Sequelize = require('sequelize');

const DB_Name = 'tasks-manager';
const USER = 'task';
const PASSWORD = 'manager123!#';

const sequelize = new Sequelize(DB_Name, USER, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;
