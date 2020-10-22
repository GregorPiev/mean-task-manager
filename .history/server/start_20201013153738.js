const http = require('http');
const url = require('url');


function start(route, handlers) {
  console.log('Start:', route)
  console.log('Start:', handlers)

  http.createServer(function (request, response) {
    console.log('URL:', request.url)
    var url_parts = url.parse(request.url, true)
    var pathname = url_parts.pathname
    console.log('Request for ' + pathname + ' received.')
    var queryString = url_parts.query;
    console.log('Query String: ', queryString)

    // route(handlers, pathname, response, queryString)
  }).listen(3000)

}
exports.start = start
