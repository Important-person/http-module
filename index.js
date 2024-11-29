const http = require('http');
const config = require('./config');

const city = process.argv[2];

if(!city) {
    console.log('Введите название города (англ. яз.)');
    process.exit(1);
};

const getWeather = (city) => {
    const { weatherApiKey, weatherBaseUrl } = config;
    const url = `${weatherBaseUrl}/current?access_key=${weatherApiKey}&query=${encodeURIComponent(city)}`;
    http.get(url, (res) => {
        const { statusCode } = res;

        if (statusCode !== 200) {
            console.error(`Ошибка: сервер вернул статус ${statusCode}`);
            res.resume();
            return;
        }

        let data = '';

        res.on('data', (chunk) => data += chunk);

        res.on('end', () => {
            const weatherData = JSON.parse(data);

            if (weatherData.success === false) {
                console.error(`Code: ${weatherData.error.code}`);
                console.error(`Type: ${weatherData.error.type}`);
                console.error(`Info: ${weatherData.error.info}`);
            } else {
                console.log(`Region: ${weatherData.location.region}`)
                console.log(`Location: ${weatherData.location.name}`);
                console.log(`Current_time: ${weatherData.current.observation_time}`);
                console.log(`Temperature: ${weatherData.current.temperature}`);
                console.log(`Weather_description: ${weatherData.current.weather_descriptions}`);
                console.log(`Wind_speed: ${weatherData.current.wind_speed}`);
            }
        })
    }).on('error', (err) => {
        console.error(err.message);
    });
};

getWeather(city);

