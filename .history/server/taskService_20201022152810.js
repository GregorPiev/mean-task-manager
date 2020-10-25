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
        }
        resultObject.error = 1;
        callback = queryString.callback;
        responseHandler.execute(response, resultObject, callback);
    } else {

    }
}