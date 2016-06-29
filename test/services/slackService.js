const chai = require('chai');
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

const sinon = require("sinon");
const rewire = require("rewire");
const slackPost = rewire("../../services/slackService");

describe("Slack service", () => {
    var post = sinon.spy();
    before(function() {
        slackPost.__set__('request', {
            post : post
        });
        slackPost.__set__('slackPostUri', 'https://slack.uri')
    });

    it("posts a message to slack", () => {

        let username = "username",
            channel = "channel",
            message = "Test message";

        slackPost(username, channel, message);

        let expectedPayload = {
            "username"  : username,
            "text"      : message,
            "channel"   : channel
        };

        let expectedOptions = {
            url     : "https://slack.uri",
            body    :  JSON.stringify(expectedPayload)
        };

        post.calledOnce.should.be.true;
        post.calledWith(expectedOptions).should.be.true;
    });
});
