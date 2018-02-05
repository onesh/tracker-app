const fsc = require('./filesystemCrud');
var that;
const googleMapsClient= require('@google/maps').createClient({
  key: 'AIzaSyCeCTTgavuVEAodICxYp-ZJ9FZ_99fc3Rs'

});


class dataProcessor {

	constructor () {
	that = this;
	this.types = {
	'V1' : that.V1Translator,
	'NBR' : that.NBRTranslator,
	  }
	console.log(that);
	};


	translator (data) {
	
	var rawData = data.toString('utf8');
	console.log(rawData);
	var splitData = rawData.split(',');

	if (splitData[2] && splitData[2] === 'V1') {
		this.types['V1'](splitData);
	} else if (splitData[2] && splitData[2] === 'NBR') {
		this.types['NBR'](splitData);

	
	} 

    };


	makePost (postData, trackarData	) {
	var ping = {};
	var length = trackarData.length;
	var cleanlatlong = function (value) {
		var decimal = 1 - (Math.ceil(value) - value)
		decimal = (decimal * 100) / 60
		return Math.floor(value) + decimal;
	
	}
	
	
	googleMapsClient.geolocate(postData, function(err, data) {
          if (!err) {
            ping = {
		id:  trackarData[1],
		latitude: cleanlatlong(data.json.location.lat),
	        longitude:  cleanlatlong(data.json.location.lat),
		datetime: new Date().toLocaleString(),
		battery: Math.floor((Number(trackerData[length - 1].charAt(0)) / 6 ) * 100),
		latitudeDelta: 0.02,
                longitudeDelta: 0.02,
		type: 'NBR'
	     };
	fsc.update(ping);
           } else {

	console.log(err);

	     }
          });	
		
	};
		


  
  	V1Translator (trackerData) {
	var cleanlatlong = function (value) {
		var decimal = 1 - (Math.ceil(value) - value)
		decimal = (decimal * 100) / 60
		return Math.floor(value) + decimal;
	}
		let ping = {
 		    id: trackerData[1],
		    latitude:  cleanlatlong(trackerData[5]/100),
		    longitude: cleanlatlong(trackerData[7]/100),
		    datetime: new Date().toLocaleString(),
		    battery: Math.floor((Number(trackerData[17].charAt(0)) / 6 ) * 100),
		    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
		    type: 'V1'	

		    }
	fsc.update(ping);
		
	};	

	NBRTranslator (trackerData) {

		let postData = {
			"homeMobileCountryCode": Number(trackerData[4]),
  			"homeMobileNetworkCode": Number(trackerData[5]),
			"cellTowers": [
  					  {
  						"cellId": Number(trackerData[9]),
      						"locationAreaCode": Number(trackerData[8]),
						"mobileCountryCode": Number(trackerData[4]),
  						"mobileNetworkCode": Number(trackerData[5]),


					  }
				      ]	
		};
			
	that.makePost(postData, trackerData);
	
};

};

const instance = new dataProcessor();
module.exports = instance;