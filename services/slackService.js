let slackPostUri = 'https://inviqa.slack.com/services/hooks/incoming-webhook?token=vx7fyGhCo0WLR96V0XcKmw9G';
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
