var server = require('./server/server')
var requestRouter = require('./server/requestRouter')
var requestHandlers = require('./server/responseHandlers')
const start = require('./server/start');
console.log('Index.js')
start.start(requestRouter.route, requestHandlers.handlers)
