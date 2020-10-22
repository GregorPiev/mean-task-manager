function execute(response, data, callback) {
  response.writeHead(200, { 'Content-type': 'application/javascript' });
  var json = JSON.stringify(data);
  console.log('Execute:', callback)
  if (callback != '') {
    json = callback + "(" + json + ")";
    response.write(json);
    response.end();
  }
}
exports.execute = execute;
