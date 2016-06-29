const rewire = require('rewire');
const UserNotFoundError = require('../../../error/UserNotFoundError');
let slashHandler = rewire('../../../models/slack/slashHandler');
const config = {
    "api_key": "abc123456",
    "secret": "def890734",
    "slash_token": "987654321"
};
const sinon = require('sinon');
require('sinon-as-promised');
const chai = require('chai');
chai.should();
const sinonChai = require("sinon-chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(sinonChai);
chai.use(chaiAsPromised);
const Promise = require('bluebird');
let postToSlack = sinon.spy();
let username = {};
username.set = sinon.spy();
username.get = sinon.stub().resolves('lastfmusername');

let slackRequestMock = {
    body : {
        text:       'lastfm_username',
        command:    '/nowplaying',
        user_name:  'slack_username',
        token:       '987654321'
    }
};

describe('Slack slash handler', () => {

    before(() => {
        slashHandler.__set__({
            'postToSlack' : postToSlack,
            'username'    : username,
            'config'      : config
        });
    });

    it ( 'validates an incoming slash', () => {
        return slashHandler(slackRequestMock).should.be.fulfilled;
    });

    it ('throws if token is invalid', () => {
        slackRequestMock.body.token = '123';
        return slashHandler(slackRequestMock).should.be.rejected;
    });

    it ('saves the username', (done) => {
        slackRequestMock.body.token = '987654321';
        slashHandler(slackRequestMock).then((value) => {
            username.set.should.have.been.calledWith('slack_username', 'lastfm_username');
            done();
        })
    });

    it ('Posts message back to user if username not found in db', (done) => {
        slackRequestMock.body.text = "";
        slackRequestMock.body.token = '987654321';

        username.get = () => {
            return Promise.reject(new UserNotFoundError());
        };

        slashHandler(slackRequestMock).then(() => {
            postToSlack.should.have.been.calledWith('LastFM Bot',
                '@slack_username',
                "Username not set. Please set your LastFM username by typing \`/nowplaying <username>\` first");
            done();
        });
    })
});
