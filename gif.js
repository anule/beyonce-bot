require('dotenv').config();
var GphApiClient = require('giphy-js-sdk-core');
client = GphApiClient(process.env.GIPHY_API_KEY);

let gifObject = {
    url: ''
};

module.exports = client
    .search('gifs', { q: 'beyonce+knowles', limit: 50 })
    .then(response => {
        let randomGif = Math.floor(Math.random() * 50);
        process.env.GIPHY_GIF = response.data[randomGif];
    })
    .catch(error => console.error);




