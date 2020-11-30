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
/************************************************************************/
const Tasks = require('../models/tasks');
const taskCategories = require('../models/taskcategories');
console.log('Tasks router'.info);
/************************************************************************/
router.get('/onLoad', async (req, res) => {
    console.log('Server onLoad');
    try {
        Tasks.belongsTo(taskCategories, { foreignKey: 'taskCategoryID' });
        taskCategories.belongsTo(Tasks, { foreignKey: 'taskCategoryID' });

        let tasksResult = await Tasks.findAll({
            include: [{ model: taskCategories }],
            order: [['dateCreated', 'DESC']]
        })
            .then(tasks => {
                console.log(JSON.stringify(tasks));
                res.status(202).json(tasks)
            })
    } catch (err) {
        console.log('Server Error:', err.message);
        res.status(500).json({ msg: err.message })
    }
});


router.post('/filteredTasks', async (req, res) => {
    console.log('Router tasks post body:'.help);
    console.log(req.body);

    const { completed, startDate } = req.body;
    const formatStartDate = dateFormat(new Date(startDate), 'mm/dd/yyyy')

    console.log('Completed + startDate:'.help);
    console.log(completed);
    console.log(formatStartDate);


    Tasks.belongsTo(taskCategories, { foreignKey: 'taskCategoryID' });
    taskCategories.belongsTo(Tasks, { foreignKey: 'taskCategoryID' });

    try {
        if ((completed === undefined || completed === null) && !!startDate === false) {
            let tasksResult = await Tasks.findAll({
                include: [{ model: taskCategories }],
                order: [['dateCreated', 'DESC']]
            })
                .then(tasks => {
                    res.status(202).json(tasks)
                })
            /*  .error(err => {
                 console.log('Error retrieving of values:', err.message)
             }) */
        } else {
            let conditions = {};
            if (completed !== undefined || completed !== null) {
                conditions.completed = completed;
            }

            console.log('formatStartDate:'.error);
            console.log(formatStartDate.toString());
            if (!!startDate !== false) {
                conditions.dateCreated = {
                    $gte: formatStartDate
                };
            }
            console.log('Conditions:'.warn);
            console.log(conditions);

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

    res.status(200).error({ msg: 'Coming up to to end point' })
})

module.exports = router;


function getFilteredTasks(response, queryString) {
    var resultObject = {};
    var callback = '';
    if (queryString.callback != undefined) {
        callback = queryString.callback;
    }


    if (queryString.filter == undefined) {
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
    } else {
        var json = JSON.parse(queryString.filter);
        var firstOne = true;
        var query = "select tasks.*, taskCategories.taskCategory" +
            " from tasks" +
            " left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID)";

        if (json.completed != undefined) {
            if (firstOne) {
                query = query + " Where ";
                firstOne = false;
            } else {
                query = query + " and "
            }

            if (json.completed == true) {
                query = query + " completed = 1";
            } else {
                query = query + " completed = 0";
            }
        }

        if (json.startDate != undefined) {
            if (firstOne) {
                query = query + " Where ";
                firstOne = false;
            } else {
                query = query + " and ";
            }
            query = query + " dateCreated>='" + json.startDate + "'";

        }
        query = query + " Order by dateCreated ";
        var dataQuery = databaseConnection.executeQuery(query,

            function (result) {
                // console.log('Result:', result);
                if (result.length == 0) {
                    resultObject.error = 1;
                    responseHandler.execute(response, resultObject, callback);
                } else {
                    resultObject.error = 0;
                    for (var x = 0; x < result.length; x++) {
                        // console.log('Current item:', result[x].dateCreated)
                        result[x].dateCreated = dateFormat(new Date(result[x].dateCreated), 'mm/dd/yyyy');
                        if (result[x].dateCreated) {
                            result[x].dateCompleted = result[x].dateCompleted != '0000-00-00' ? dateFormat(new Date(result[x].dateCompleted), 'mm/dd/yyyy') : '0000-00-00';
                        } else {
                            result[x].dateCompleted = '';
                        }

                        if (result[x].dateScheduled) {
                            result[x].dateScheduled.setDate(result[x].dateScheduled.getDate() + 1)
                            result[x].dateScheduled = dateFormat(new Date(result[x].dateScheduled), 'mm/dd/yyyy');
                        } else {
                            result[x].dateScheduled = '';
                        }

                    }
                    resultObject.resultObject = result;
                    responseHandler.execute(response, resultObject, callback);
                }
            },
            function (err) {
                console.log('err:', err)
                resultObject.error = 1;
                responseHandler.execute(response, resultObject, callback);
            }
        )

        resultObject.error = 1;
        callback = queryString.callback;
        responseHandler.execute(response, resultObject, callback);
    }
}
