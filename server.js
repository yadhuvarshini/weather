const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

require("dotenv").config();

const apiKey = `${process.env.b3c7710e6faeb93ea97d4433a472e5de}`;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true}));
app.set("View engine","ejs");

app.get("/", function (req,res){
    res.render("index", { weather: null, error:null})

 app.post('/',function(req,res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${erode}&units=metric&appid=${b3c7710e6faeb93ea97d4433a472e5de}`;

    request(url,function(err,response,body) {
        if(err) {
            res.render('index',{weather:null,error:'error, please try again later'});
        }
         else {
            let weather = JSON.parse(body);
            console.log(weather);

            if(weather.main == undefined) {
                res.render('index', {weather: null, error: 'error, please try again later'});
            }else {
                let place = `${weather.aname}, ${weather.sys.country}`,
                weatherTimeZone = `${new Date(
                    weather.dt * 1000 - weather.timezone * 1000
                )}`;
                let weatherTemp = `${weather.main.temp}`,
                weatherPresssure = `${weather.main.pressure}`,
                weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                weatherDescription = `${weather.weather[0].description}`,
                humidity = `${weather.main.humidity}`,
                clouds = `${weather.clouds.all}`,
                visiblity = `${weather.visiblity}`,
                main = `${weather.weather[0].main}`,
                weatherFahrenheit;
                weatherFahreinheit = (weatherTemp * 9)/5 + 32;

                function roundToTwo(num) {
                    return + (Math.round(num+"e+2")+"e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);
                res.render("index", {
                    weather: weather,
                    place: place,
                    temp: weatherTemp,
                    pressure: weatherPresssure,
                    icon: weatherIcon,
                    description: weatherDescription,
                    timezone: weatherTimeZone,
                    humidity: humidity,
                    fahrenheit: weatherFahrenheit,
                    clouds: clouds,
                    visiblity: visiblity,
                    main: main,
                    error: null,
                });

                app.listen(5000, function () {
                    console.log("Weather app listening on port 5000!");
                  });
            }
        }

       });
   });
   
});


