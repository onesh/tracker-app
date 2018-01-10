const server = require ('tk102');

// start server
server.createServer ({
  port: 9000
});

console.log('Server started on port 9000');

// incoming data, i.e. update a map
server.on ('data', function (raw) {
  console.log ('Incoming data: '+ raw);
});
