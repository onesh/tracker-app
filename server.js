const net = require('net');
const dataProcessor = require('./dataProcessor');
const api = require('./api');


const server = net.createServer((socket)=> {

if (socket)  console.log('  ====>  Incoming Tracker Request....');

});


server.on('listening', (data)=> {
console.log('server listening on port', server.address().port, ' and IP ', server.address().address);
});


server.on('error', (err) => {
    console.log('error occurred  =====>  ', err);
});

server.on('connection', (socket)=> {
	socket.on('data', (data)=>{
	dataProcessor.translator(data);
	});

});

server.listen(9000, '172.31.39.132');