const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

    let url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=aea1059100409efea41bd792327cd1f6&units=m"
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.weather[0].description

            console.log(temp);
        })
    });
    res.send("Server is up and running!");
});




app.listen(3000, function(){
    console.log("Server is listening on port 3000: ")
})