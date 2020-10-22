const http = require('http');
const url = require('url');

http.createServer((req, res, next) => {
  res.end('Server work')
}).listen(3000)
