const should = require("should");
const sinon = require("sinon");
const sinonaspromised = require("sinon-as-promised");
const rewire = require("rewire");

const LastFmService = rewire('../services/lastFmService');

describe("LastFM Service", () => {

    let dummyResponse,
        makeRequestStub,
        lfmService;

    before(() => {
        dummyResponse = {
            artist: { "#text" : "Test Artist" },
            name:   "Test track name",
            nowplaying: false
        };

        makeRequestStub = sinon.stub();
        makeRequestStub.resolves(dummyResponse);

        LastFmService.__set__('lastfm', {
                makeRequest: makeRequestStub
            }
        );

        lfmService = new LastFmService();
    });

    it ("Makes request to last FM", (done) => {
        lfmService.getTrackForUser('username')
            .then(() => {
                makeRequestStub.calledOnce.should.be.true;
                makeRequestStub.calledWith('username').should.be.true;
                done();
            });
    });

    it ("Fires track-data-received event", (done) => {
        let eventSpy = sinon.spy();
        setTimeout(() => {
            eventSpy.calledOnce.should.be.true;
            eventSpy.calledWith(dummyResponse).should.be.true;
            done();
        }, 1);

        lfmService.on('track-data-received', eventSpy);
        lfmService.getTrackForUser('onotron');
    });
});
