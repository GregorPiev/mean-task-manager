const http = require('http');
const url = require('url');
const { route } = require('./requestRouter');


http.createServer(function (request, response) {
  console.log('URL:', request.url)
  var url_parts = url.parse(request.url, true)
  var pathname = url_parts.pathname
  console.log('Request for ' + pathname + ' received.')
  var queryString = url_parts.query;
  console.log('Query String: ', queryString)

  // route(handlers, pathname, response, queryString)
}).listen(3000)

console.log('Server running at http://127.0.0.1:3000/');
exports.server = server;
