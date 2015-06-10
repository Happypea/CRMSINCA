
var express    = require('express');		
var app        = express();
var http 	     = require('http'); 				
var bodyParser = require('body-parser'); 	
var morgan     = require('morgan'); 		
var mongoose   = require('mongoose');
var config 	   = require('./config');
var path 	     = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});


app.use(morgan('dev'));


mongoose.connect(config.database); 



app.use(express.static(__dirname + '/public'));



var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);
/////////////////////
var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0
    ;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
  });
});
/////////////////////



app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));

});

process.on('uncaughtException', function (err) {
  console.log(err);
})

//app.listen(config.port);
var server = http.createServer(app);

server.listen(config.port,"0.0.0.0");
console.log('Iniciado puerto ' + config.port);