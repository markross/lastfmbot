const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require("sinon-chai");
const lastfm = require('../../adapter/lastFmRequest');
chai.should();
chai.use(sinonChai);

const sinonaspromised = require("sinon-as-promised");
const rewire = require("rewire");

const getTrackForUser = rewire('../../services/lastFmService');
let lastFmService;

describe("LastFM Service", () => {

    before(()=> {

        lastFmService = {};
        lastFmService.makeRequest = sinon.spy();
        getTrackForUser.__set__({
            'lastfm': lastFmService
        });
    });

    it('makes request to LastFM', () => {
        getTrackForUser('username');
        lastFmService.makeRequest.calledWith('username').should.be.true;
    });
});
