const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const dateFormat = require('dateformat');
/************************************************************************/
const Tasks = require('../models/tasks');
const taskCategories = require('../models/taskcategories');
console.log('Tasks router');
/************************************************************************/
router.get('/filteredTasks', async (req, res) => {
    console.log('Router tasks get');
    const filter = req.query.filter;
    console.log('Filter:', filter);
    let tasksResult = Tasks.findAll({
        include: [
            {
                model: taskCategories,
                where: { taskCategoryID = Tasks.taskCategoryID }
            }
        ],
        order: [['dateCreated', 'DESC']]
    }).then(tasks => {
        console.log(JSON.stringify(tasks));
    })
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
