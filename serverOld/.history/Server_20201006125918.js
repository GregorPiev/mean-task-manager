const http = require('http');
const url = require('url');


http.createServer((req, res, next) => {
  console.log('Server run')
  const url_parts = url.parse(req.url, true)
  res.end('Server work')
}).listen(3000)
