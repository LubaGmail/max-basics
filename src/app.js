const http = require('http');

//const handleRequest = require('./routes');
const routes = require('./routes');

const server = http.createServer(routes.handler);
   
server.listen(3000);




