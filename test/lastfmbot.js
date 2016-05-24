const should = require("should");
const sinon = require("sinon");
const rewire = require("rewire");
const Bot = rewire("../models/lastFmBot.js")

describe("LastFM bot", () => {
    let requestMock = {};
    let LastFmServiceMock = class {};
    let spotifyService = {};

    let lfmService;
    let bot;

    before(() => {

        Bot.__set__({
            //'LastFmService' : lastFmService,
            'spotifyService' : spotifyService
        });

        requestMock.query = {
            "user_name" : "sl_username",
            "text"      : "lfm_username",
            "channel_id"    : "ABCDEF"
        };

        LastFmServiceMock.prototype.getTrackForUser = sinon.stub().returns({
            "track" : "Track name",
            "artist" : "Artist name"
        });

        lfmService = new LastFmServiceMock();
        bot = new Bot(lfmService);

        spotifyService.search = sinon.stub();
        spotifyService.search.returns('http://dummy.uri')
    });

    describe("Processes the request", () => {

        it('Extracts query params from slack request', () => {
            bot.processReq(requestMock);
            bot.getLastFmUsername().should.be.exactly("lfm_username");
            bot.getSlackUsername().should.be.exactly("sl_username");
            bot.getSlackChannelId().should.be.exactly("ABCDEF");
        });

        it('Gets the track from the last fm service', () => {
            bot.getTrackForUser();
            lfmService.getTrackForUser.called.should.be.true;
            lfmService.getTrackForUser.calledWith(bot.getLastFmUsername()).should.be.true;
        });

        it('Gets the Spotify URL', () => {

            let result = bot.getTrackForUser();

            spotifyService.search.withArgs({
                "track" : "Track name",
                "artist" : "Artist name"
            }).called.should.be.true;

            result.should.be.exactly("http://dummy.uri");
        });

    });
});
