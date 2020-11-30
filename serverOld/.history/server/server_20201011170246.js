const http = require('http');
const url = require('url');

function start(route, handlers) {
  http.createServer((req, res, next) => {
    console.log('Server run')
    const url_parts = url.parse(req.url, true);
    const pathname = url_parts.pathname;

    console.log('Request for:' + pathname + " received.")
    console.log('handlers:', handlers['/login'])
    console.log('res:', req.queryString)
    handlers['/login'](res, req.queryString);
    res.write('The index')
  }).listen(3000)
}
exports.start = start


