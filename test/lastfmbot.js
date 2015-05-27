var should = require("should");
var sinon = require("sinon");
var rewire = require("rewire");
var bot = rewire("../models/lastFmBot.js")

var requestMock = {};
var lastFmService = function() {};
var spotifyService = {};

describe("LastFM bot", function(){

    before(function(){
        bot.__set__({
            'LastFmService' : lastFmService,
            'spotifyService' : spotifyService
        });

        requestMock.query = {
            "user_name" : "sl_username",
            "text"      : "lfm_username",
            "channel_id"    : "ABCDEF"
        };

        lastFmService.getTrackForUser = sinon.stub().returns({
            "track" : "Track name",
            "artist" : "Artist name"
        });

        spotifyService.search = sinon.stub();
        spotifyService.search.returns('http://dummy.uri')
    });

    describe("Processes the request", function(){

        it('Extracts query params from slack request', function(){
            bot.processReq(requestMock);
            bot.getLastFmUsername().should.be.exactly("lfm_username");
            bot.getSlackUsername().should.be.exactly("sl_username");
            bot.getSlackChannelId().should.be.exactly("ABCDEF");
        });

        it('Sends gets the track from the last fm service', function(){
            bot.getTrackForUser();
            lastFmService.getTrackForUser.called.should.be.true;
            lastFmService.getTrackForUser.calledWith(bot.getLastFmUsername()).should.be.true;
        });

        it('Gets the Spotify URL', function() {

            var result = bot.getTrackForUser();

            spotifyService.search.withArgs({
                "track" : "Track name",
                "artist" : "Artist name"
            }).called.should.be.true;

            result.should.be.exactly("http://dummy.uri");
        });

    });
});
