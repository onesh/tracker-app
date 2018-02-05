var fs = require('fs'); 
class writer {
 constructor() { }


 update(data) {
 
  var stored = this.getData(); 
  if (typeof stored === 'object') {

	 stored[9310154213].push(data); 
         fs.writeFileSync('./database/tracker-logs.json', JSON.stringify(stored)); 

	}
  
  };

 getData (key, index) { 
   var readFileData = fs.readFileSync('./database/tracker-logs.json'); 
   var JSONreadFileData = JSON.parse(readFileData);

	if (key && typeof key === 'string') {
		return JSONreadFileData[key];

	} else if (key && index) {

	return JSONreadFileData[key][index];

	
	} else if (!key && !index) {
	
	return JSONreadFileData;

	} else {

		return {};
	
	}
   
   return 
} 

} 

module.exports = new writer();