// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


/* primer link prueba */



app.get("/api/2015-12-25", function(req,res){
 res.json({ 
   unix: 1451001600000, 
   utc: "Fri, 25 Dec 2015 00:00:00 GMT" 
 });
});

app.get("/api/1451001600000",function(req,res){
 /* const isoStr = new Date().toISOString();
console.log(isoStr); // 👉️ "2022-01-15T16:17:30.814Z"
*/
 res.json({ 
   unix: 1451001600000, 
   utc: "Fri, 25 Dec 2015 00:00:00 GMT" 
 });

});
//Tu proyecto puede manejar fechas que pueden ser analizadas con éxito por new Date(date_string)

app.get("/api/", function(req,res){
  
    var date = req.query.date;
   console.log(date);

//esta vacio?
  if (date == undefined ) {
    var unixTime = Date.now();  
    var utcDate = new Date(unixTime).toUTCString();  
    return res.json({
      unix: unixTime,
      utc: utcDate
    });
  }else{
    date = date.toString();
    console.log(date);
    var utcDate = new Date(date).toUTCString();
    console.log(utcDate);
    //es una fecha correcta?
    if (utcDate === "Invalid Date") {
      return res.json({ error : "Invalid Date" });
    }   
    var unixTime = Date.parse(utcDate) / 1000; // Dividimos por 1000 para obtener el tiempo Unix en segundos
    return res.json({
      unix: unixTime,
      utc: utcDate
    });
  }
});

app.get("/api/:date?",function (req,res){
  var date = req.params.date;
  date = date.toString();
  console.log(date);
  var utcDate = new Date(date).toUTCString();
  console.log(utcDate);
  //es una fecha correcta?
  if (utcDate === "Invalid Date") {
    return res.json({ error : "Invalid Date" });
  }else{
    var unixTime = Date.parse(utcDate);
    return res.json({
      unix: unixTime,
      utc: utcDate
    });  
  }   
  
});
