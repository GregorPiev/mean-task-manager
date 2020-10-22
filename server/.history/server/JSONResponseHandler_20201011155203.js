function execute(response, data, callback) {
  response.writeHead(200, { 'Content-type': 'application/javascript' });
  var json = JSON.stringify(data);
}
