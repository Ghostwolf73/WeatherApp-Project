const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    let url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=aea1059100409efea41bd792327cd1f6&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescr = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imgURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            res.write(`<h1>The weather is ${temp} degrees`);
            res.write(`<h2>${weatherDescr}</h2>`);
            res.write("<img src="+ imgURL +">");
            res.send();
        })
    });
    
});




app.listen(3000, function(){
    console.log("Server is listening on port 3000: ")
})