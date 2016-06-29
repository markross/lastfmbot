let lastfm  = require('../adapter/lastFmRequest');
let config = require("../config.json");

let getTrackForUser = (username) => {
    return lastfm.makeRequest(username, config.api_key);
}


module.exports = getTrackForUser;
