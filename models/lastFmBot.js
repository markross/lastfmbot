let spotifyService = require('../services/spotifyService');
let postToSlack = require("../services/slackService");
let lastFmGetTrack = require("../services/lastFmService");
let username = require('../models/username');

module.exports = class {
    getLastFmUsername () {
        return this.lastFmUsername;
    }
    getSlackUsername () {
        return this.slackUsername;
    }
    getSlackChannelId() {
        return this.slackChannelId;
    }

    processSlash (slash) {
        this.lastFmUsername = slash.last_fm_username;
        this.slackUsername = slash.user_name;
        this.slackChannelId = slash.channel_id;
        this.getTrackForUser().then((trackDetails) => {
            this.postTrackToSlack(trackDetails);
        });
    }
    
    getTrackForUser () {

        let trackDetails;
        return lastFmGetTrack(this.lastFmUsername)
            .then((trackData) => {
                trackDetails = trackData;
                return spotifyService.search(trackDetails.artist['#text'], trackDetails.album['#text'], trackDetails.name);
            })
            .then((spotifyUrl) => {
                trackDetails.url = spotifyUrl;
                return trackDetails;
            })
            .catch( (e) => {
                return trackDetails;
            });
    }

    postTrackToSlack(trackDetails) {
        let message = `${this.slackUsername} ${trackDetails.nowplaying ? "is currently playing " : "recently played "}`;
        message += `${trackDetails.name} by ${trackDetails.artist['#text']}
${trackDetails.url}`;
        postToSlack('LastFM Bot', this.getSlackChannelId(), message);
    }
    
}
