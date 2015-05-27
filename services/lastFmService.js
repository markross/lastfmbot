var lastfm  = require('../adapter/lastFmRequest');
var util    = require("util");
var events  = require("events");

var config = {
    api_key: 'af52f06ce25b3ce1ee63e30b0e423210',
    secret: 'b4722a50fa9b0d37317afdd8c19a6399'
}

//var trackDetails;
//
//var getTrackForUser = function(username) {
//    return lastfm.makeRequest(username, config.api_key, config.user_name)
//        .then(function(response){
//
//        });
//};

function LastFmService() {
    events.EventEmitter.call(this);
}

util.inherits(LastFmService, events.EventEmitter);

LastFmService.prototype.getTrackForUser = function(username) {
    var emitEvent = function(response) {
        this.emit("track-data-received", response);
    }.bind(this);

    return lastfm.makeRequest(username, config.api_key, config.user_name)
        .then(function(response){
            emitEvent(response);
        });
};



//module.exports = {
//    getTrackForUser : getTrackForUser,
//    getTrackDetails: function() {
//        return trackDetails;
//    }
//}
module.exports = LastFmService;
