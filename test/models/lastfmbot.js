const chai = require('chai');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
const sinon = require("sinon");
const rewire = require("rewire");
const Bot = rewire("../../models/lastFmBot.js");
require("sinon-as-promised");

describe("LastFM bot", () => {
    let slashMock = {};
    let lastFmStub;
    let spotifyService = {};

    let lfmService;
    let bot;

    before(() => {

        slashMock = {
            "user_name"     : "sl_username",
            "text"          : "lfm_username",
            "channel_id"    : "ABCDEF",
            "last_fm_username" : "lfm_username"
        };

        lastFmStub = sinon.stub().resolves({
            "name" : "Track name",
            "album" : {
                '#text' : 'Album name'
            },
            "artist" : {
                '#text' : "Artist name"
            }
        });

        spotifyService.search = sinon.stub().resolves('http://spotify.url');

        Bot.__set__({
            'lastFmGetTrack' : lastFmStub,
            'spotifyService' : spotifyService
        });

        bot = new Bot();

        
    });

    describe("Processes the request", () => {

        it('Extracts query params from slack request', () => {
            bot.processSlash(slashMock);
            bot.getLastFmUsername().should.equal("lfm_username");
            bot.getSlackUsername().should.equal("sl_username");
            bot.getSlackChannelId().should.equal("ABCDEF");
        });

        it('Gets the track from the last fm service', () => {
            bot.getTrackForUser();
            lastFmStub.called.should.be.true;
            lastFmStub.calledWith(bot.getLastFmUsername()).should.be.true;
        });

        it('Finds the track on Spotify', (done) => {
            bot.getTrackForUser().then((trackDetails) => {
                spotifyService.search.should.have.been.called;
                trackDetails.url.should.equal('http://spotify.url');
                done();
            }).catch((e) => console.log(e));

        })
    });
});
