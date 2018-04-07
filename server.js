require('dotenv').config();
var path = require('path');
var express = require('express');
var app = express();
var Twit = require('twit');
var tracery = require('tracery-grammar');
var config = {
    twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    }
};
var T = new Twit(config.twitter);

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.use(express.static('public'));

function tweet() {
    T.post('statuses/update', { status: 'hello world 👋' }, function(
        err,
        data,
        response
    ) {
        if (err) {
            console.log('error!', err);
        }
    });
}

/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all('/' + process.env.BOT_ENDPOINT, function(req, res) {
    tweet();
});

var listener = app.listen(process.env.PORT, function() {
    console.log('Your bot is running on port ' + listener.address().port);
});
