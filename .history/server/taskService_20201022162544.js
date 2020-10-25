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