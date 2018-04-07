require('dotenv').config();
var path = require('path');
var express = require('express');
var app = express();
var tweet = require('./tweet');

app.use(require('morgan')('dev'));

// auth and api routes
// app.use('/auth', require('./auth'));
// app.use('/api', require('./api'));

/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all('/' + process.env.BOT_ENDPOINT, function(req, res) {
});


// tweet();

var listener = app.listen(process.env.PORT, function() {
    console.log('Your bot is running on port ' + listener.address().port);
});
