var databaseConnection = require('./database/DatabaseConnection');
var responseHandler = require('./JSONResponseHandler');

function login(response, queryString) {
  var resultObject = {};
  var callback = "";
  console.log('Login:', queryString)
  if (queryString.method != undefined) {
    callback = queryString.method;
  }

  if ((queryString.username == undefined) || (queryString.password == undefined)) {
    resultObject.error = 1;
    responseHandler.execute(response, resultObject, callback);
  } else {
    query = "select * from users"
    query = query + " where username = '" + queryString.username + "'";
    query = query + " and password = '" + queryString.password + "'";

    var dataQuery = databaseConnection.executeQuery(query, function (results) {
      console.log('Login executeQuery result:', results)
      if (results.length == 1) {
        resultObject.error = 0;
        resultObject.result = {};
        resultObject.result.userId = results.RowDataPacket.userId;
        resultObject.result.username = results.RowDataPacket.userName;
        resultObject.result.roleId = results.RowDataPacket.roleId;
      } else {
        resultObject.error = 1;
      }

      console.log('Login executeQuery resultObject:', resultObject)

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
