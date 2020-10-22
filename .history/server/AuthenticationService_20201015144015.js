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
      console.log('Typeof:', typeof (results))

      const res = { ...results };
      console.log('Login executeQuery res:', res)

      // console.log('Login executeQuery results length:', results.length)
      // console.log('Login executeQuery results 1:', results)
      // console.log('Login executeQuery results 1:', results[0])


      if (results.length == 1) {

        const { userId, user, roleId } = results;
        console.log('Login executeQuery assignment:' + userId + '  ' + user + ' ' + roleId)
        resultObject.error = 0;
        resultObject.result = { userId: 0, username: '', roleId: 0 };
        resultObject.result.userId = userId;
        resultObject.result.username = user;
        resultObject.result.roleId = roleId;
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
