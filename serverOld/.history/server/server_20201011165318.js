const http = require('http');
const url = require('url');
// const handlers = require('./responseHandlers');

function start(route, handlers) {
  http.createServer((req, res, next) => {
    console.log('Server run')
    const url_parts = url.parse(req.url, true);
    const pathname = url_parts.pathname;

    console.log('Request for:' + pathname + " received.")
    console.log('handlers:', handlers)
    handlers();
    res.write('The index')
  }).listen(3000)
}
exports.start = start


