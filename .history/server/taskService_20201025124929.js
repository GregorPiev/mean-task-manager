const dateFormat = require('dateformat');
const databaseConnection = require('./database/DatabaseConnection');
const responseHandler = require('./JSONResponseHandler');

function getFilteredTasks(response, queryString) {
    // console.log('taskService=>response:', response)
    console.log('taskService=>getFilteredTasks:', queryString)
    console.log('taskService=>.callback:', queryString.callback)
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
        query = query + " Order by dateCreated "
        console.log('Query:', query);
        var dataQuery = databaseConnection.executeQuery(query,
            function (result) {
                console.log('Result:', result.length)
                resultObject.error = 0;
                if (result.length == 0) {
                    resultObject.error = 1;
                    responseHandler.execute(response, resultObject, callback);
                } else {
                    for (var x = 0; x < result.recordset.length; x++) {
                        result.recordset[x].dateCreated = dateFormatter(result.recordset[x].dateCreated, 'mm/dd/yyyy');
                        if (result.recordset[x].dateCreated) {
                            result.recordset[x].dateCompleted = dateFormatter(result.recordset[x].dateCompleted, 'mm/dd/yyyy');
                        } else {
                            result.recordset[x].dateCompleted = '';
                        }

                        if (result.recordset[x].dateScheduled) {
                            result.recordset[x].dateScheduled.setDate(result.recordset[x].dateScheduled.getDate() + 1)
                            result.recordset[x].dateScheduled = dateFormatter(result.recordset[x].dateScheduled, 'mm/dd/yyyy');
                        } else {
                            result.recordset[x].dateScheduled = '';
                        }

                    }
                    resultObject.resultObject = result.recordset;
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
exports.getFilteredTasks = getFilteredTasks;