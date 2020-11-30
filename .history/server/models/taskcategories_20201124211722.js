const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const taskCategories = sequelize.define('Taskcategories', {
    taskCategoryID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    taskCategory: {
        type: Sequelize.STRING,
        allowNull: true
    }
})


module.exports = taskCategories;