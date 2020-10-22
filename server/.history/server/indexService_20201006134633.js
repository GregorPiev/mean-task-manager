function execute(response, queryString) {
  response.writeHeader(200, { 'Content-type': 'text/plain' })
  response.write('The index');
  response.end();
}

exports.execute = execute
