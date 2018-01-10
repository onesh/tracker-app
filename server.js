const server = require('tk102');
const firebaseCreds = require('./firebase-creds.json');
const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCreds),
  databaseURL: 'https://trackerapp95.firebaseio.com'
});
// start server
server.createServer({
  port: 9000
});

console.log('Server started on port 9000');

// incoming data, i.e. update a map
server.on('data', function(raw) {
  console.log('Incoming data: ' + raw);
});

const deviceId = '133';
const lat = '62.93';
const lon = '43.49';
const db = firebaseAdmin.database();
db.ref('/Location/' + deviceId).set({
  lat,
  lon
});
