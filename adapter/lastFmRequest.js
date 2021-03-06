'use strict';

var lastFm = require('lastfm').LastFmNode;
var Promise = require('bluebird');
var config = require('../config.json');

var makeRequest = function(username) {
    return new Promise(function(resolve, reject) {
        var lastfm = new lastFm({
            api_key: config.api_key,
            secret: config.secret
        });

        var nowplaying = lastfm.request('user.getRecentTracks', {
            user : username,
            nowplaying: "true",
            handlers : {
                success:  (function (data) {
                    var track = data.recenttracks.track[0];
                    track.nowplaying = false;
                    if (track['@attr'] !== undefined) {
                        track.nowplaying = track['@attr']['nowplaying'] ? true : false;
                    }

                    resolve(track);
                }),
                error : (e) =>  console.log(e.message)
            }
        });
    });
};

module.exports = {
    makeRequest: makeRequest
};
