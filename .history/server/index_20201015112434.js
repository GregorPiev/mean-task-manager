var server = require('./server')

var requestHandlers = require('./responseHandlers')
const start = require('./start');

start.start(requestRouter.route, requestHandlers.handlers)
