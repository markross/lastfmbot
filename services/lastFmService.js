let lastfm  = require('../adapter/lastFmRequest');

let getTrackForUser = (username) => {
    return lastfm.makeRequest(username);
}


module.exports = getTrackForUser;
