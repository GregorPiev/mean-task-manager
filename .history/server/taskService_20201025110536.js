const dateFormat = require('dateformat');
const databaseConnection = require('./database/DatabaseConnection');
const responseHandler = require('./JSONResponseHandler');

function getFilteredTasks(response, queryString) {
    var resultObject = {};
    var callback = '';
    if (queryString.callback != undefined) {
        var json = JSON.parse(queryString.filter);
        var firstOne = true;
        var query = "select task,*, taskCategories.taskCategory" +
            " from tasks" +
            " left outer join taskCategories on (tasks.taskCategoryID = taskCategories.taskCategoryID";

        if (json.competed != undefined) {
            if (firstOne) {
                query = query + " Where ";
                firstOne = false;
            } else {
                query = query + " and "
            }

            if (json.competed == true) {
                query = query + " competed = 1";
            } else {
                query = query + " competed = 0";
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
        query = query + " order by dateCreated "
        var dataQuery = databaseConnection.executeQuery(query,
            function (result) {
                resultObject.error = 0;
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

            },
            function (err) {

            }
        )

        resultObject.error = 1;
        callback = queryString.callback;
        responseHandler.execute(response, resultObject, callback);
    } else {

    }
}