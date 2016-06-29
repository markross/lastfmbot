const storage = require('../adapter/db');
const Promise = require('bluebird');
const extractUserNameFromRequest = (req) => typeof req.body.text !== 'undefined' ? req.body.text : false;

const userNameSupplied = (req) => {
    return extractUserNameFromRequest(req) && extractUserNameFromRequest(req).trim().length !== 0
}

module.exports = {
    get: Promise.method((req) => {
        if (userNameSupplied(req)) {
            return extractUserNameFromRequest(req);
        }
        return storage.getLastFmUsername(req.body.user_name).then((username) => {
            return username;
        });
        
    }),

    set: (slackUserName, lastFmUserName) => {
        storage.saveLastFmUsername(slackUserName, lastFmUserName);
    }
};




