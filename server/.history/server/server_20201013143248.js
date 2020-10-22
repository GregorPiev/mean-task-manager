const http = require('http');
const url = require('url');

function start(route, handlers) {
  http.createServer((req, res, next) => {
    console.log('Server run')
    const url_parts = url.parse(req.url, true);
    const pathname = url_parts.pathname;
    const queryString = url_parts.query.parse();
    console.log('Request for:' + pathname + "")
    console.log('queryString :', queryString)
    res.end(pathname)
  }).listen(3000)
}
exports.start = start


