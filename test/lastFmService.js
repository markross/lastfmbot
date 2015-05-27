var should = require("should");
var sinon = require("sinon");
var sinonaspromised = require("sinon-as-promised");
var rewire = require("rewire");

var LastFmService = rewire('../services/lastFmService');
var Promise = require('bluebird');

describe("LastFM Service", function() {

    var dummyResponse = {
        artist: { "#text" : "Test Artist" },
        name:   "Test track name",
        nowplaying: false
    };

    var makeRequestStub = sinon.stub();
    makeRequestStub.resolves(dummyResponse);

    LastFmService.__set__('lastfm', {
            makeRequest: makeRequestStub
        }
    );

    it ("Makes request to last FM", function(done) {
        var lfmService = new LastFmService();
        lfmService.getTrackForUser('username')
            .then(function(){
                makeRequestStub.calledOnce.should.be.true;
                makeRequestStub.calledWith('username').should.be.true;
                done();
            });
    });
})
