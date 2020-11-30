var server = require('./server/server')
var requestRouter = require('./server/requestRouter')
var requestHandlers = require('./server/responseHandlers')
server.start(requestRouter.route, requestHandlers.handlers)
