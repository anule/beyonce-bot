require('dotenv').config();
var GphApiClient = require('giphy-js-sdk-core');
var client = GphApiClient(process.env.GIPHY_API_KEY);
const config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */
        twitter: {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        }
    },
    Twit = require('twit'),
    T = new Twit(config.twitter),
    gif = require('./gif');
// search for gifs

function tweet() {
    client
        .search('gifs', { q: 'beyonce+knowles', limit: 50 })
        .then(response => {
            let randomGif = Math.floor(Math.random() * 50);
            let gif = response.data[randomGif];
            var b64content = fs.readFileSync(gif.images.fixed_width_still.url, { encoding: 'base64'});

            T.post('media/upload', { media_data: b64content }, function(err, data, response){
                var mediaIdStr = data.media_id_string;
                var meta_params = { media_id: mediaIdStr};
                T.post('media/metadata/create', meta_params, function(err, data, response){
                    var params = { media_ids: [mediaIdStr] };
                    T.post('statuses/update', params, function(err, data, response){
                        console.log(data);
                    });
                });
            });

        })
        .catch(error => console.error);
}

tweet();
module.exports = tweet;
