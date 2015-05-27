'use strict';
var LastFmService = require('../services/lastFmService');
var lastFmService = new LastFmService();
var spotifyService = require('../services/spotifyService');

var lastFmUsername,
    slackUsername,
    slackChannelId;

module.exports = {
    getLastFmUsername : function () {
        return lastFmUsername;
    },
    getSlackUsername : function () {
        return slackUsername;
    },
    getSlackChannelId : function() {
        return slackChannelId;
    },
    processReq : function (req) {
        lastFmUsername = req.query.text;
        slackUsername = req.query.user_name;
        slackChannelId = req.query.channel_id;
    },
    getTrackForUser : function () {
        var track = lastFmService.getTrackForUser(lastFmUsername);
        return spotifyService.search(track);
    }
}
