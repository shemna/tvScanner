var geoNearby = require('geo-nearby');
var _ = require('lodash');
var nearChannelDistance = 75000; //<75 km near channels
var farChannelDistance = 150000; // 75 -150 far channels

var TvChannels = function TvChannels(tvChannels) {
  var _geoSet = geoNearby(tvChannels).createCompactSet({id: 'name', lat: 'lat', lon: 'lon'});

  this.findNearby = function(lat, lon, callback) {
  	var near = geoNearby(_geoSet, {sorted: true}).nearBy(lat, lon, nearChannelDistance);
  	var far = _.difference(geoNearby(_geoSet, {sorted: true}).nearBy(lat, lon, farChannelDistance), near);
  	var data = {near: [], far: []};
  	near.forEach(function(item) {
  		data.near.push(item.i);
  	});
  	far.forEach(function(item) {
  		data.far.push(item.i);
  	});
  	callback(null, data);
  };
};

module.exports = TvChannels;