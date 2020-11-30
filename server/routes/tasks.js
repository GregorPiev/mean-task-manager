const colors = require('colors');
colors.setTheme({
    info: 'bgGreen',
    help: 'cyan',
    warn: 'yellow',
    success: 'bgBlue',
    error: 'red',
    log: 'orange'
});


const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const dateFormat = require('dateformat');
const { Op } = require('sequelize');
/************************************************************************/
const Tasks = require('../models/tasks');
const taskCategories = require('../models/taskcategories');
console.log('Tasks router'.info);
/************************************************************************/

router.post('/filteredTasks', async (req, res) => {
    console.log('Router tasks post body:'.help);
    const { completed, startDate } = req.body;

    try {
        Tasks.belongsTo(taskCategories, { foreignKey: 'taskCategoryID' });
        taskCategories.belongsTo(Tasks, { foreignKey: 'taskCategoryID' });
        if ((completed === undefined || completed === null) && !!startDate === false) {
            let tasksResult = await Tasks.findAll({
                include: [{ model: taskCategories }],
                order: [['dateCreated', 'DESC']]
            })
                .then(tasks => {
                    res.status(202).json(tasks)
                })
        } else {
            let conditions = {};
            if (completed !== undefined || completed !== null) {
                conditions.completed = completed;
            }

            if (!!startDate !== false) {
                const formatStartDate = dateFormat(new Date(startDate), 'mm/dd/yyyy');
                conditions.dateCreated = {
                    [Op.gte]: formatStartDate
                };
            }

            let tasksResult = await Tasks.findAll({
                where: conditions,
                include: [{ model: taskCategories }],
                order: [['dateCreated', 'DESC']]
            })
                .then(tasks => {
                    res.status(202).json(tasks)
                });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
})

module.exports = router;



