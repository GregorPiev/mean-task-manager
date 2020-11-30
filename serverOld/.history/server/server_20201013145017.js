const http = require('http');
const url = require('url');


http.createServer(function (request, response) {
  console.log('URL:', request.url)
  var url_parts = url.parse(request.url, true)
}).listen(3000)

console.log('Server running at http://127.0.0.1:3000/');
