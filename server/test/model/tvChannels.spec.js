var assert = require('assert');
var should = require('should');

var TvChannelsModel = require('../../src/model/tvChannels');
var tvChannels = new TvChannelsModel([
	{"lat": -33, "lon": 150, "name": "TV1"},
	{"lat": -33.86944, "lon":151.20833, "name": "TV2"},
	{"lat":-37.82056, "lon":144.96139, "name": "TV3"},
	{"lat":-34.93333, "lon":138.58333, "name": "TV4"},
	{"lat":-27.46778, "lon":153.02778, "name": "TV5"},
	{"lat":-31.95306, "lon":115.85889, "name": "TV6"}
]);

describe('Model findNearby function' , function() {
    it('should return near (within 75km) and far (between 75km and 150km miles)', function(done) {
      tvChannels.findNearby(-33.5, 151, function(error, data) {
      	if(error) return done(error);
      	should(data).have.property('near').with.lengthOf(1);
      	should(data).have.property('far').with.lengthOf(1);
      	done();
      });
    });
});