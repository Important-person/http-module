require('dotenv').config();

const config = {
    weatherApiKey: process.env.WEATHER_API_KEY,
    weatherBaseUrl: 'http://api.weatherstack.com',
};

module.exports = config;
