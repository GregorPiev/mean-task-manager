var server = require('./server/server')
console.log(server)
var requestRouter = require('./server/requestRouter')
var requestHandlers = require('./server/responseHandlers')
const start = require('./server/start');

start.start(requestRouter.route, requestHandlers.handlers)
