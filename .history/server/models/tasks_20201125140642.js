const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const tasks = sequelize.define('Tasks', {
    taskID: {
        primaryKey: true,
        type: Sequelize.IndexHints,
        allowNull: false,
        autoIncrement: true
    },
    taskCategoryID: {
        foreignKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userID: {
        foreignKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    completed: {
        type: Sequelize.INTEGER
    },
    dateCreated: {
        type: Sequelize.DATE
    },
    dateCompleted: {
        type: Sequelize.DATE
    },
    dateScheuled: {
        type: Sequelize.DATE
    }
});
module.exports = tasks;

