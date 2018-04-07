require('dotenv').config();
var path = require('path'),
    express = require('express'),
    app = express(),
    Twit = require('twit'),
    tracery = require('tracery-grammar'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */

        twitter: {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

function tweet() {
    T.post('statuses/update', { status: 'hello world 👋' }, function(err, data, response) {
        if (err){
            console.log('error!', err);
        }
    });
}

tweet();
/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all('/' + process.env.BOT_ENDPOINT, function(req, res) {

});


var listener = app.listen(process.env.PORT, function() {
    console.log('Your bot is running on port ' + listener.address().port);
});
