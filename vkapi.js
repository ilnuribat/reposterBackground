const request = require('request');
const config = require('./config');
const access_token = `access_token=${config.access_token}`;
const URL = `https://api.vk.com/method`;

module.exports = (method, params) =>
    new Promise((resolve, reject) => {
        const URI = `${URL}/${method}?${access_token}&${params}`;
        console.log(URI);
        request.get(URI, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            let jsonBody
            try {
                jsonBody = JSON.parse(body);
            }
            catch(err) {
                reject(err);
                return;
            }
            if (jsonBody.error)
                reject(jsonBody.error);
            else 
                resolve(jsonBody.response);
        });
    });