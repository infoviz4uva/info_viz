var express = require('express');
var router = express.Router();
var fs = require('fs');
var googleTrends = require('../node_modules/google-trends-api/lib/google-trends-api.min.js');
var jsonfile = require('jsonfile')




function google_words(words){
var list = [];
googleTrends.interestByRegion({keyword: words})
.then((res) => {
	
	var json_file = JSON.parse(res);
	json_file['default']['geoMapData'].forEach(function(element){
	list.push([element['geoCode'],element['formattedValue'][0]])


  })
	jsonfile.writeFile('message.txt', list)
})
.catch((err) => {
  console.log(err);
})
}

// google_words('ISIS')
module.exports = google_words;


// router.get('/', function(req, res, next) {
//   res.render('index2', { title: 'Express' });
// });