var databaseConnection = require('../database/DatabaseConnection');
var responseHandler = require('./JSONResponseHandler');

function login(response, queryString) {
  var resultObject = {};
  var callback = "";
  if (queryString.callback != undefined) {
    callback = queryString.callback;
  }

  if ((queryString.username == undefined) || (queryString.password == undefined)) {
    resultObject.error = 1;
    responseHandler.execute(response, resultObject, callback);
  }
}
