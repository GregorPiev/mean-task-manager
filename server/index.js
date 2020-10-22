var server = require('./server')
var requestRouter = require('./requestRouter')
var requestHandlers = require('./responseHandlers')
const start = require('./start');

start.start(requestRouter.route, requestHandlers.handlers)
