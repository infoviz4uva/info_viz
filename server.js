var express = require('express');
var fs = require('fs');
var request = require('request');
var googleTrends = require('google-trends-api');
var app = express();
var http = require('http');
var path = require("path");
var util = require('util');
var jsonfile = require('jsonfile');
var bodyParser = require("body-parser");
var list = [];
var count = 0;

app.get('/', function(req, res){
  //util.log(util.inspect(req)); // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
  //util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url); // this line logs just the method and url
  url = 'https://www.kickstarter.com/projects/1449277917/1681752382?token=b9cbe6aa';
  var title = unescape(req.url);
  var parsed, parsedCategory, parsedName;

    if (title && title.indexOf('?') > -1) {
      parsed = JSON.parse(title.split('?')[1]);
      parsedCategory = parsed[0];
      parsedName = parsed[1];
      google(parsedCategory);
      googleOvertime(parsedName);
    }
    console.log(parsedCategory, parsedName);
    res.sendFile(path.join(__dirname + '/index.html'));
});

function google(category){
  googleToFile(category);
  google_words(category);
  }

function googleToFile(topic){
var countries = ['DE','FR','NL','GB','ES','BE','IT','IE']
var testing = [];

countries.forEach(function(element2){

googleTopics(element2)
function googleTopics(geo){
googleTrends.relatedTopics({keyword: topic, geo: element2})
.then((res) => {
var json_file = JSON.parse(res);
var oj = json_file['default']['rankedList'][0]['rankedKeyword']

for(var z=0; z< oj.length;z++){
testing.push([geo,oj[z].topic.title, oj[z].value])};
jsonfile.writeFile('./data/wordssss.txt',testing)
}) }  })}


function google_words(words){
var list = [];
googleTrends.interestByRegion({keyword: words})
.then((res) => {
  
  var json_file1 = JSON.parse(res);
  json_file1['default']['geoMapData'].forEach(function(element){
  list.push([element['geoCode'],element['formattedValue'][0]])
  })
  jsonfile.writeFile('./data/trendssss.txt', list)
})
.catch((err) => {
  console.log(err);
})
}
function googleOvertime(word){
  first="name\t2004-01\t2004-02\t2004-03\t2004-04\t2004-05\t2004-06\t2004-07\t2004-08\t2004-09\t2004-10\t2004-11\t2004-12\t2005-01\t2005-02\t2005-03\t2005-04\t2005-05\t2005-06\t2005-07\t2005-08\t2005-09\t2005-10\t2005-11\t2005-12\t2006-01\t2006-02\t2006-03\t2006-04\t2006-05\t2006-06\t2006-07\t2006-08\t2006-09\t2006-10\t2006-11\t2006-12\t2007-01\t2007-02\t2007-03\t2007-04\t2007-05\t2007-06\t2007-07\t2007-08\t2007-09\t2007-10\t2007-11\t2007-12\t2008-01\t2008-02\t2008-03\t2008-04\t2008-05\t2008-06\t2008-07\t2008-08\t2008-09\t2008-10\t2008-11\t2008-12\t2009-01\t2009-02\t2009-03\t2009-04\t2009-05\t2009-06\t2009-07\t2009-08\t2009-09\t2009-10\t2009-11\t2009-12\t2010-01\t2010-02\t2010-03\t2010-04\t2010-05\t2010-06\t2010-07\t2010-08\t2010-09\t2010-10\t2010-11\t2010-12\t2011-01\t2011-02\t2011-03\t2011-04\t2011-05\t2011-06\t2011-07\t2011-08\t2011-09\t2011-10\t2011-11\t2011-12\t2012-01\t2012-02\t2012-03\t2012-04\t2012-05\t2012-06\t2012-07\t2012-08\t2012-09\t2012-10\t2012-11\t2012-12\t2013-01\t2013-02\t2013-03\t2013-04\t2013-05\t2013-06\t2013-07\t2013-08\t2013-09\t2013-10\t2013-11\t2013-12\t2014-01\t2014-02\t2014-03\t2014-04\t2014-05\t2014-06\t2014-07\t2014-08\t2014-09\t2014-10\t2014-11\t2014-12\t2015-01\t2015-02\t2015-03\t2015-04\t2015-05\t2015-06\t2015-07\t2015-08\t2015-09\t2015-10\t2015-11\t2015-12\t2016-01\t2016-02\t2016-03\t2016-04\t2016-05\t2016-06\t2016-07\t2016-08\t2016-09\t2016-10\t2016-11\t2016-12\t2017-01\t2017-02\t2017-03" + '\n'
  fs.writeFileSync("./data/file1.txt",first);

  var index =-1;
  for(x=0 ; x < word.length; x++){
    console.log(word[x])
    googleTrends.interestOverTime({keyword: word[x]}).then((elet) => {
      // console.log(elet)
      values = [];
      json_file = JSON.parse(elet);
       console.log(json_file)
      data2 = json_file['default']['timelineData']
      index +=1
      data2.forEach(function(e){
        values.push( e.value[0]);
      })

        b = word[index]+'\t'+ values.join("\t")+'\n'
        fs.appendFileSync("./data/file1.txt",b)

    })
  }
}

app.use(express.static(__dirname + '/amaka/'));
app.use(express.static(__dirname + '/jessica/'));
app.use(express.static(__dirname + '/fernando/'));
app.use(express.static(__dirname + '/data/'));
app.use(express.static(__dirname + '/'));

app.use(bodyParser.json({}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen('8080');

exports = module.exports = app;
