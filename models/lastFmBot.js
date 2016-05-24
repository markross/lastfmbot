'use strict';
let spotifyService = require('../services/spotifyService');

module.exports = class {
    constructor(lfmSrvc) {
        this.lastFmService = lfmSrvc
    }

    getLastFmUsername () {
        return this.lastFmUsername;
    }
    getSlackUsername () {
        return this.slackUsername;
    }
    getSlackChannelId() {
        return this.slackChannelId;
    }

    processReq (req) {
        this.lastFmUsername = req.query.text;
        this.slackUsername = req.query.user_name;
        this.slackChannelId = req.query.channel_id;
    }
    
    getTrackForUser () {
        var track = this.lastFmService.getTrackForUser(this.lastFmUsername);
        //lastFmService.on('')
        return spotifyService.search(track);
    }
}
