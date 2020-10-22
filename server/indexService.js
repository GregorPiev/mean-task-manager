function execute(response, queryString) {
  console.log('Execute')
  response.writeHeader(200, { 'Content-type': 'text/plain' })
  response.write('The Index');
  response.end();
}

exports.execute = execute
