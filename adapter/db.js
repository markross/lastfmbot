const Datastore = require('nedb');
const db = new Datastore({ filename: 'username_mappings' });
const Promise = require("bluebird");
const UserNotFoundError = require('../error/UserNotFoundError');

db.loadDatabase();
db.ensureIndex({ fieldName: 'slack', unique: true });

module.exports = {
    getLastFmUsername: (slackUserName) => {
        return new Promise((resolve, reject) => {
            db.find({
                slack: slackUserName
            }, (err, docs) => {
                if (err) {
                    reject(err);
                }

                if (!docs.length) {
                    reject(new UserNotFoundError("Username not found"))
                } else {
                    resolve(docs[0].lastFm);
                }
            })
        })
    },
    saveLastFmUsername: (slackUserName, lastFmUserName) => {
        db.update(
            {
                slack: slackUserName
            },
            {
                slack: slackUserName,
                lastFm: lastFmUserName
            },
            {
                upsert: true
            }
        )
    }
}
