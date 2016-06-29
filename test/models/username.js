const rewire = require('rewire');
const username = rewire('../../models/username');
const sinon = require('sinon');
const sap = require('sinon-as-promised');
const storage = require('../../adapter/db');
const chai = require('chai');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

describe("Username", () => {

    before(() => {
        username.__set__('storage', storage);

    });

    it('looks up the lastFM username from the DB if no username supplied', () =>  {
        sinon.spy(storage, 'getLastFmUsername');
        let slackUsername = 'slack_username';
        let requestMock = {
            body: {
                text: "",
                user_name: slackUsername
            }
        }

        username.get(requestMock);

        storage.getLastFmUsername.should.have.been.called;
        storage.getLastFmUsername.calledWith(slackUsername).should.be.true;
    })
})
