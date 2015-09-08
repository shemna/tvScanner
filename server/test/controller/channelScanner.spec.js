var assert = require('assert');
var should = require('should');
var rewire = require('rewire');

var channelScanner = rewire('../../src/controller/channelScanner');

describe('channelScanners getNearbyChannels' , function() {
  before(function(done){
    channelScanner.initialize([{"lat": -33.86944, "lon":151.20833, "name": "TV2"}], function(error) {
      channelScanner.__set__({
         'geoip': {'lookup': function(){return ({ll:[-33.87, 151.2]})}},
     });
      done(error);
    });
  });  
  it('if lat and lon are specified, return near array eith one entry ', function(done) {
    channelScanner.getNearbyChannels({lat:-33.87, lon:151.2}, function(error, data) {
    	if(error) return done(error);
    	should(data).have.property('near').with.lengthOf(1);
    	should(data).have.property('far').with.lengthOf(0);
    	done();
    });
  });

  it('if lat and lon are not specified, return near array with one entry ', function(done) {
    channelScanner.getNearbyChannels({}, function(error, data) {
      if(error) return done(error);
      should(data).have.property('near').with.lengthOf(1);
      should(data).have.property('far').with.lengthOf(0);
      done();
    });
  });

  it('if lat and lon are  specified, near array should be empty ', function(done) {
    channelScanner.getNearbyChannels({lat:-35.87, lon:170.2}, function(error, data) {
      if(error) return done(error);
      should(data).have.property('near').with.lengthOf(0);
      should(data).have.property('far').which.is.a.Array();
      done();
    });
  });
});