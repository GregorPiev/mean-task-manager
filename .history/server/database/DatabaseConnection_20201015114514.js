var mysql = require('mysql');
var config = {
  host: 'http://localhost:1234',
  user: 'task',
  password: 'manager123!#',
  database: 'tasks-manager'
}

var executeQuery = function (query, resultHandler, failureHandler) {
  var connection = mysql.createConnection(config);
  connection.connect(function (err) {
    if (err) {
      return failureHandler;
    }
    console.log('connected as id ' + connection.threadId);
  });

  var query = connection.query(query);
  query
    .on('error', function (err) {
      failureHandler
    })
    .on('result', function (row) {
      resultHandler
    })
    .on('end', function () {
      connection.end();
    });
  /* connection.connect(function () {
    new sql.Request(connection)
      .query(query)
      .then(resultHandler)
      .catch(failureHandler);
  }) */
}
exports.executeQuery = executeQuery;
