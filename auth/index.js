const simpleOauthModule = require('simple-oauth2');
const request = require('request');
const router = require("express").Router();

/*genius auth*/
const oauth2 = simpleOauthModule.create({
    client: {
        id: process.env.GENIUS_CLIENT_ID,
        secret: process.env.GENIUS_CLIENT_SECRET
    },
    auth: {
        tokenHost: 'https://api.genius.com',
        tokenPath: '/oauth/access_token',
        authorizePath: '/oauth/authorize'
    }
});

request.get(`https://api.genius.com/oauth/authorize?client_id=${process.env.GENIUS_CLIENT_ID}&redirect_uri=http://localhost:3000/callback&scope=me&state=bee&response_type=code`, (err, data, res) => {
    console.log(data);
    if (err) console.error(err);
});

router.get('/callback', (req, res, next) => {
    console.log(req.query.code);
});

var options = {
    uri: 'https://api.genius.com/oauth/token',
    method: 'POST',
    json: {
        code: 'CODE_FROM_REDIRECT',
        client_id: process.env.GENIUS_CLIENT_ID,
        client_secret: process.env.GENIUS_CLIENT_SECRET,
        redirect_uri: process.env.GENIUS_REDIRECT_URI,
        response_type: 'code',
        grant_type: 'authorization_code'
    }
};

// request(options, function(error, response, body) {
//     console.log(body);
//     if (!error && response.statusCode == 200) {
//         console.log(body.id); // Print the shortened url.
//     }
// });

module.exports = router;
