var sql = require('mysql');
var config = {
  user: 'task',
  password: 'manager123!#',
  server: 'http://localhost:1234',
  database: 'tasks-manager',
  port: 1234
}

var executeQuery = function (query, resultHandler, failureHandler) {
  var connection = new sql.ConnectionPool(config);
  connection.connect(function () {
    new sql.Request(connection)
      .query(query)
      .then(resultHandler)
      .catch(failureHandler);
  })
}
exports.executeQuery = executeQuery;
