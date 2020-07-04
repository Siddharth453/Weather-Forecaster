const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
     res.render('form.ejs')
});
app.post('/result', (req, res) => {
   const url = 'http://api.weatherstack.com/current?access_key=' + process.env.API_KEY + '&query=' + req.body.query;
   request({url: url, json: true}, (error, response) => {
      if(error){
         res.render('nointernet.ejs')
      }else if(response.body.error){
         res.render('notfound.ejs')
      }else{
         // const query = data.request.type + ': ' + data.location.name + ", " + data.location.region + ' - ' + data.location.country + ', Temperture: ' + data.current.temperature + "° - " + data.current.weather_descriptions +  ", Humidity: " + data.current.humidity + ', Wind Direction: ' + data.current.wind_dir + ',\n' +  "Is Day: " + data.current.is_day + ', UV_Index: ' + data.current.uv_index + ", Pressure: " + data.current.pressure +
         //  ', Precipitation: ' + data.current.precip + ', Wind Speed: ' + data.current.wind_speed + ", Wind Degree: " + data.current.wind_degree + '°'
         res.render('result.ejs', {query: response.body});
      }
   });
});
app.get("*", (req, res)=>{
   res.render('404.ejs')
})
app.listen(process.env.PORT || 4000, process.env.IP, () => {
    console.log('SERVER HAS STARTED!!!');
})