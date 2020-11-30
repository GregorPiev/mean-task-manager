const { modelNames } = require('mongoose');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

module.exports = Roles = sequelize.define('Roles', {
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

module.exports = Taskcategories = sequelize.define('Taskcategories', {
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

module.exports = Tasks = sequelize.define('Tasks', {
    taskID: {
        primaryKey: true,
        type: Sequelize.IndexHints,
        allowNull: false,
        autoIncrement: true
    },
    taskCategoryID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userID: {
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

module.exports = Users = sequelize.define('Users', {
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
    roleID: {},
})

