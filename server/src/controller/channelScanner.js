var tvChannels;
var _ = require('lodash');
var externalip = require('externalip');
var geoip = require('geoip-lite');
var TvChannelsModel = require('../model/tvChannels');

exports.initialize = function(tvChannelsJson, callback) {
	tvChannels = new TvChannelsModel(tvChannelsJson);
	callback();
};

exports.getNearbyChannels = function(reqObj, callback) {
	if(_.isUndefined(reqObj.lat) || (_.isUndefined(reqObj.lon))) {
		externalip(function(error, ip){
			if(error) return callback(error);
			var ipLocation = geoip.lookup(ip);
			tvChannels.findNearby(ipLocation.ll[0], ipLocation.ll[1], callback);
		});
	} else {
		tvChannels.findNearby(reqObj.lat, reqObj.lon, callback);
	}
};
