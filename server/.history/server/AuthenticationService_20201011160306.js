var databaseConnection = require('../database/DatabaseConnection');
var responseHandler = require('./JSONResponseHandler');

function login(response, queryString) {
  var resultObject = {};
  var callback = "";
  if (queryString.callback != undefined) {
    callback = queryString.callback;
  }
}
