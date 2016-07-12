let Promise = require('bluebird');
let UserNotFoundErr = require('../../error/UserNotFoundError');
let username = require("../username");
let postToSlack = require('../../services/slackService');
let config = require('../../config.json');

const validate = (requestToken) => {
    //@Todo validate command==='/nowplaying';
    return requestToken === config.slash_token;
}

const userNameSupplied = (req) => {
    return typeof req.body.text !== 'undefined' && req.body.text.trim().length !== 0;
}

function UserNotFoundError(e) {
    return e instanceof UserNotFoundErr && e.name === 'UserNotFoundError';
}

module.exports = Promise.method((req) => {
    if (!validate(req.body.token)) {
        throw new Error("Invalid token");
    }

    let body = req.body;
    var lastFmUserName;
    if (userNameSupplied(req)) {
        username.set(body.user_name, body.text);
        lastFmUserName = body.text;
        postToSlack(
            "LastFM Bot",
            `@${req.body.user_name}`,
            `I've remembered your LastFM username as ${lastFmUserName}. Next time you can omit it.`);
        body.last_fm_username = lastFmUserName;
        return body;
    } else {
        return username.get(req)
            .then((username) => {
                body.last_fm_username = username;
                return body;
            }).catch(UserNotFoundError, (e) => {
                postToSlack("LastFM Bot",
                    `@${req.body.user_name}`,
                    "Username not set. Please set your LastFM username by typing \`/nowplaying <username>\` first");
            });
    }

});
