require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
//Static Files
app.use(express.static("public"));
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
//ejs
app.set("view engine", "ejs");

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  var city = req.body.city;
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
  var weather_info = {};
  axios
    .get(url)
    .then((response) => {
      // var data = response.data;
      weather_info.temperature = response.data.main.temp;
      weather_info.description = response.data.weather[0].description;
      weather_info.icon_url = ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
      weather_info.city = city;
      console.log(weather_info);
      res.render("weather", { weather: weather_info });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(city);
});
//Starting Server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started At PORT : 5000");
});
