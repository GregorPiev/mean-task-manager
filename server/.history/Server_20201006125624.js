const http = require('http');
const url = require('url');

http.createServer((req, res, next) => {
  console.log('Server run')
  res.end('Server work')
}).listen(3000)
