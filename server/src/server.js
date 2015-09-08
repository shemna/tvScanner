
var restify = require('restify');
var tvChannelsJson = require('../data/tvChannels.json');
var channelScanner = require('./controller/channelScanner');


var server = restify.createServer({
  name: 'tvChannelScanner',
  version: '0.1.1'
});

function startServer() {
	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.queryParser());
	server.use(restify.bodyParser());

	server.get('/channels', function (req, res, next) {
	  channelScanner.getNearbyChannels({lat: req.params.lat, lon: req.params.lon}, function(error, data) {
	  	if(error) res.send({error: error});
	  	else res.send(data);
	  });
	  return next();
	});
	 
	server.listen(5000, function () {
	  console.log('%s listening at %s', server.name, server.url);
	});
}

channelScanner.initialize(tvChannelsJson, function(error) {
	if(error) {
		console.log("Error in controller initialization, Exiting...");
		process.exit(0);
	}
	startServer();
});



 
