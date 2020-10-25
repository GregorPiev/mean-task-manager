const dateFormat = require('dateformat');
const databaseConnection = require('./database/DatabaseConnection');
const responseHandler = require('./JSONResponseHandler');

function getFilteredTasks(response, queryString) {
    var resultObject = {};
    var callback = '';
    if (queryString.callback != undefined) {
        callback = queryString.callback;
    }
}