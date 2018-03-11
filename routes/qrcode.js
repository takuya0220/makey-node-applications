var express = require('express');
var router = express.Router();

const {checkSchema, validationResult} = require('express-validator/check');

var fs = require('fs');
var QRCodeApi = require('qrcode-api');

router.get('/', checkSchema({
    data: {
        exists: true,
        errorMessage: 'Invalid data'
    },
    type: {
        exists: true,
        errorMessage: 'Invalid type'
    }
}), function(req, res) {
    // create folder 'tmp'
    if (!fs.existsSync('tmp')) {
        console.log('mkdir "tmp"')
        fs.mkdirSync('tmp');
    }
    try {
        validationResult(req).throw();
        if (req.query.type == 'image') {
            (new QRCodeApi(req.query)).createQRCode(function(err, data) {
                res.set('Content-Type', 'image/png');
                res.send(data).end();
            });
        } else if (req.query.type == 'string') {
            (new QRCodeApi(req.query)).createQRCode(function(err, data) {
                res.send(data).end();
            });
        } else if (req.query.type == 'file') {
            (new QRCodeApi(req.query)).createQRCode(function(err, data, path) {
                res.set('Content-Type', 'image/png');
                res.send(data).end();
            });
        } else if (req.query.type == 'stream') {
            (new QRCodeApi(req.query)).createQRCode(function(err, data) {
                res.set('Content-Type', 'image/png');
                res.end();
            });
        } else {
            res.end('Not Empty');
        }
    } catch (err) {
        // Oh noes. This user doesn't have enough skills for this...
        res.status(400).send('There have been validation errors: ' + require('util').inspect(result.array()));
    }
});

module.exports = router;
