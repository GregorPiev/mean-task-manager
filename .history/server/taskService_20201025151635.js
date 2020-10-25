const dateFormat = require('dateformat');
const databaseConnection = require('./database/DatabaseConnection');
const responseHandler = require('./JSONResponseHandler');

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
                console.log('Result:', result);
                if (result.length == 0) {
                    resultObject.error = 1;
                    responseHandler.execute(response, resultObject, callback);
                } else {
                    resultObject.error = 0;
                    for (var x = 0; x < result.length; x++) {
                        console.log('Current item:', result[x].dateCreated)
                        result[x].dateCreated = dateFormat(result[x].dateCreated, 'mm/dd/yyyy');
                        if (result[x].dateCreated) {
                            result[x].dateCompleted = dateFormat(result[x].dateCompleted, 'mm/dd/yyyy');
                        } else {
                            result[x].dateCompleted = '';
                        }

                        if (result[x].dateScheduled) {
                            result[x].dateScheduled.setDate(result[x].dateScheduled.getDate() + 1)
                            result[x].dateScheduled = dateFormat(result[x].dateScheduled, 'mm/dd/yyyy');
                        } else {
                            result[x].dateScheduled = '';
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