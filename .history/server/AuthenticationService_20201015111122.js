var databaseConnection = require('./database/DatabaseConnection');
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
  } else {
    query = "select * from users"
    query = query + " where username = '" + queryString.username + "'";
    query = query + " and password = '" + queryString.password + "'";

    var dataQuery = databaseConnection.executeQuery(query, function (result) {
      if (result.recordset.length == 1) {
        resultObject.error = 0;
        resultObject.resultObject = {};
        resultObject.resultObject.userId = result.recordset[0].userId;
        resultObject.resultObject.username = result.recordset[0].userName;
        resultObject.resultObject.roleId = result.recordset[0].roleId;
      } else {
        resultObject.error = 1;
      }

      responseHandler.execute(response, resultObject, callback)
    },
      function (err) {
        console.log('AuthenticationServiceExecuteFailureHandler')
        console.log(err);
        resultObject.error = 1;
        responseHandler.execute(response, resultObject, callback);
      });
  }
}

exports.login = login;
