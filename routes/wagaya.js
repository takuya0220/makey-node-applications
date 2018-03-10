var express = require('express');
var router = express.Router();
var Slack = require('slack-node');
var cronJob = require('cron').CronJob;
var Wagaya = require('wagaya-100yen-menu');

var wagaya = new Wagaya();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('wagaya', {'title': 'Starter Template for Bootstrap'});
});

router.post('/find', function(req, res, next) {
    doFindWagaya('a', function(data) {
        res.render('wagaya', {data: data});
    });
});

function doFindWagaya(where, callback) {
    wagaya.findWagaya100Yen(where, function(err, data) {
        callback(data);
    });
};

function doInsertWagaya() {
    wagaya.insertWagaya100Yen();
}

function setupCron() {
    var cronTime = "0 0 4 1 * *";
    var job = new cronJob({
        cronTime: cronTime,
        onTick: function() {
            console.log('onTick')
            doInsertWagaya();
        },
        onComplete: function() {
            console.log('onComplete!')
        },
        start: false,
        timeZone: "Asia/Tokyo"
    });
    job.start();
}
setupCron();

// function slackWebhook() {
//     var slack = new Slack();
//     var webhookUri = 'https://hooks.slack.com/services/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';
//     slack.setWebhook(webhookUri);
//     slack.webhook({
//         channel: "#maeda_room",
//         username: "maeda_t",
//         text: "This is posted to #general and comes from a bot named webhookbot."
//     }, function(err, response) {
//         console.log(response);
//     });
// }
// slackWebhook();
module.exports = router;
