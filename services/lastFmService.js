let lastfm  = require('../adapter/lastFmRequest');
let util    = require("util");
let events  = require("events");
let config = require("../config.json");

class LastFmService {
    constructor() {
        events.EventEmitter.call(this);
    }

    getTrackForUser(username) {
        const emitEvent = (response) => {
            this.emit("track-data-received", response);
        };

        return lastfm.makeRequest(username, config.api_key)
            .then(function(response){
                emitEvent(response);
            });
    }
}

util.inherits(LastFmService, events.EventEmitter);

module.exports = LastFmService;
