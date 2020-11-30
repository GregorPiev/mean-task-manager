const http = require('http');
const url = require('url');
const handlers = require('./responseHandlers');

function start(route, handlers) {
  http.createServer((req, res, next) => {
    console.log('Server run')
    const url_parts = url.parse(req.url, true);
    const pathname = url_parts.pathname;
    const command = handlers[handlers]

    console.log('command:', command)
    console.log('Request for:' + pathname + " received.")
    console.log('handlers:', handlers)
    res.write('The index')
  }).listen(3000)
}
exports.start = start


