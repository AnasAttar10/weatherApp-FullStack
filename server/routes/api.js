const express = require("express");
const urllib = require("urllib");
const router = express.Router();
let Cities = require("../models/City");
const myKey = "2d13d2cc1fce4006a6f175413212712";
const API_EXTERNAL = `https://api.weatherapi.com/v1/current.json?key=${myKey}&aqi=no&q=`;
let cityWeather = {};

function loadCityWeather(cityInformation) {
  cityWeather.name = cityInformation.location.name;
  cityWeather.temperature = cityInformation.current.temp_c;
  cityWeather.condition = cityInformation.current.condition.text;
  cityWeather.conditionIcon = cityInformation.current.condition.icon;
  return cityWeather;
}

router.get("/cities", (req, res) => {
  Cities.find({}, function (err, cities) {
    if (cities === null) cities = [];
    res.send(cities);
  });
});

router.get("/city/:cityName", (req, res) => {
  let city = req.params.cityName;
  urllib.request(`${API_EXTERNAL}${city}`, (err, data, _res) => {
    if (err) throw err;
    let result = loadCityWeather(JSON.parse(data));
    res.send(result);
  });
});

router.post("/city", (req, res) => {
  let cityObject = { ...req.body };
  let c1 = new Cities(cityObject);
  c1.save();
  res.send(c1);
});

router.put("/city/:cityName", (req, res) => {
  let cityName = req.params.cityName;
  urllib.request(`${API_EXTERNAL}${cityName}`, (err, data, _res) => {
    if (err) throw err;
    let result = loadCityWeather(JSON.parse(data));
    Cities.findOneAndUpdate(
      { name: cityName },
      {
        name: result.name,
        temperature: result.temperature,
        condition: result.condition,
        conditionIcon: result.conditionIcon,
      },
      {
        new: true,
      },
      function (err, result) {
        res.send(result);
      }
    );
  });
});
router.delete("/city/:cityName", (req, res) => {
  let cityName = req.params.cityName;
  Cities.findOne({ name: cityName }, function (error, city) {
    console.log("This object will get deleted !" + city.name);
    city.remove();
  });
});

module.exports = router;
