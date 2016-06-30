let slackPostUri = require('../config.json').incoming_webhook;
let Promise = require('bluebird');
let request = require('request');

const postToSlack = (username, channel, message) => {
    
    let payload = {
        "username"  : username,
        "text"      : message,
        "channel"   : channel
    };

    let options = {
        url     : slackPostUri,
        body    :  JSON.stringify(payload)
    };

    let cb = (error, response, body) => {
        
    };

    request.post(options, cb);
};

module.exports = postToSlack;
