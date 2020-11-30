var server = require('./server/server')
var requestRouter = require('./server/requestRouter')
var responseHandlers = require('./server/responseHandlers')
server.start(requestRouter.route, responseHandlers.handlers)
