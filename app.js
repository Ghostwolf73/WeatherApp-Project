const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {


  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //cityName is the name of the input in the html
  const query = req.body.cityName;
  const apiKey = "aea1059100409efea41bd792327cd1f6";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescr = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imgURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
      res.write(`<h1>The weather in ${query} is ${temp} degrees`);
      res.write(`<h2>${weatherDescr}</h2>`);
      res.write("<img src=" + imgURL + ">");
      res.send();
    })
  });

})




app.listen(3000, function () {
  console.log("Server is listening on port 3000: ")
})