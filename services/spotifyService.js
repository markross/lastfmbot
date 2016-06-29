const Promise       = require("bluebird");
const request       = Promise.promisify(require("request"));
const querystring   = require("querystring");

let getTrackFromSpotify = (query) => {
    let spotifyUrl;

    return new Promise((resolve, reject) => {
        request("https://api.spotify.com/v1/search?" + query).then(function(response) {
            let trackDetails = JSON.parse(response[1]);
            try {
                spotifyUrl = trackDetails.tracks.items[0].external_urls.spotify;
                resolve(spotifyUrl);
            } catch (e) {
                if (e instanceof TypeError) {
                    reject(new Error("Couldn't find track"));
                }
            }
        });
    });
};

module.exports = {
    search : function(artist, album, track) {
        let query = {
            q: artist + " " + album + " " + track,
            type: "artist,album,track"
        };

        query = querystring.stringify(query);
        return getTrackFromSpotify(query);
    }
}
