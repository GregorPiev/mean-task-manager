function execute(response, data, callback) {
  response.writeHead(200, { 'Content-type': 'application/javascript' });
  var json = JSON.stringify(data);
  console.log('Execute callback:', callback)
  if (callback != '') {
    json = callback + "(" + json + ")";
    console.log('Execute json:', json)
    // response.write(json);
    response.json(json);
    // response.end();
  }
}
exports.execute = execute;
