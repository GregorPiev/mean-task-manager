var mysql = require('mysql');
var config = {
  host: '127.0.0.1',
  port: 3306,
  user: 'task',
  password: 'manager123!#',
  database: 'tasks-manager',
  debug: false
}

var executeQuery = function (query, resultHandler, failureHandler) {
  console.log('Database Connection executeQuery Query:', query)
  var connection = mysql.createConnection(config);

  console.log('Database Connection executeQuery connection:', connection)
  connection.connect(function (err) {
    if (err) {
      console.log('Database Connection executeQuery connection Error:', err)
      return failureHandler;
    }

  });

  console.log('connected as id ' + connection.threadId);

  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

  /* var query = connection.query(query);
  query
    .on('error', function (err) {
      console.log('Query Error:', err)
      failureHandler(err)
    })
    .on('result', function (row) {
      console.log('Query result:', result)
      resultHandler(row)
    })
    .on('end', function () {

      console.log('Query end:', result)
      resultHandler(row)
      connection.end();
    }); */

  /* connection.connect(function () {
    new sql.Request(connection)
      .query(query)
      .then(resultHandler)
      .catch(failureHandler);
  }) */
}
exports.executeQuery = executeQuery;
