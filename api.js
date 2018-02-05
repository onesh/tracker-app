var express = require('express');
var bodyParser = require('body-parser')


var app = express();
const fs = require('fs');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.post('/signup', function (req, res) {
   if (req.body.username && req.body.password) {
	var userTable = fs.readFileSync('./database/device-list.json');
	userTable = JSON.parse(userTable);
	userTable[req.body.username] = {trackers: [], password: req.body.password};
	fs.writeFileSync('./database/device-list', userTable);
	res.end(200);
	}
    else res.send(403)
});



app.post('/login', function (req, res) {

console.log('login api is hit', req.body)

   if (req.body.username === '9310154213'&& req.body.password === 'sam123456') {
	    res.end(200);
	     console.log('user 9310154213 logged in')
  }
	  else res.send(403)

});



app.post('/getTrackerData', function (req, res) {

var tdata = fs.readFileSync('./database/tracker-logs.json');
var parsedData = JSON.parse(tdata)["9310154213"];

var data = {};

for (i=0; i< parsedData.length	; i++) {


if (parsedData[i].id ) {
	    data[parsedData[i].id] = parsedData[i];
	}

}

res.setHeader('Content-Type','application/json');
console.log(data);
res.send(data);
res.end('200')

});

app.post('/addDevice', function (req, res) {

});

app.post('/deleteDevice', function (req, res) {

});



app.listen(8000, function () {
  console.log('api server listening on port 8000');
});
