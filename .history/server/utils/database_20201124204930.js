const Sequelize = require('sequelize');

const DB_Name = 'tasks-manager';
const USER = 'task';
const PASSWORD = 'manager123!#';

const sequelize = new Sequelize(DB_Name, USER, PASSWORD, {
    host: '127.0.0.1',
    port: 3306,
    user: USER,
    password: PASSWORD,
    database: DB_Name,
    dialect: 'mysql',
    debug: false
})

module.exports = sequelize;