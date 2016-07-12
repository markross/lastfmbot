const express = require('express');
const router = express.Router();
const Bot = require('../models/lastFmBot');
const slashHandler = require('../models/slack/slashHandler');


router.post('/', (req, res) => {
    
    let bot = new Bot();

    try {
        slashHandler(req).then((slashPostVars) => {
            bot.processSlash(slashPostVars);
            res.status(200).end();
        }).catch((e) => {
            if (e.name = 'UserNameNotFound') {
                res.send(200);
            } else {
                res.send(500);
            }
        });

    } catch ($e) {
        console.error("ERROR PROCESSING SLACK POST!", $e.message);
        console.error($e.stack);
        res.send(401);
    }
});

module.exports = router;



