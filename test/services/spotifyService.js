const chai = require('chai');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

const rewire = require('rewire');
const spotify = rewire('../../services/spotifyService');
var sinon = require('sinon');
require('sinon-as-promised');

describe("Spotify Search", () => {

    before(() => {
        let requestMock = sinon.stub().resolves('http://spotify.uri')
        spotify.__set__('getTrackFromSpotify', requestMock);
    });

    it("Searches the Spotify API for the track", (done) => {
        spotify.search('artist', 'album', 'track').then((url) => {
            url.should.equal('http://spotify.uri');
            done();
        });
    });
})
