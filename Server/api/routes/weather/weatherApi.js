var express = require('express');
var router = express.Router();
var imdbObj = require('node-movie');
var jwt = require('jsonwebtoken');
var weatherModel = require('../../../models/weather/weather');
var config=require('../../../config/config.json');
var app = express();

app.set('superSecret', config.secret);




router.get('/findAll',function(req,res){
  console.log("check")
  return weatherModel.find(function (err, weather) {
    if (err) {
      return console.log(err);

    } else {

console.log("Weather" +weather.cod);

for(var i=0;i<weather.length;i++){
    weather[i]  ={

          cod:weather[i].cod,
          name:weather[i].name,
          id:weather[i].id,
          temp:weather[i].temp,
          main:{
            pressure:weather[i].pressure,
            humidity:weather[i].humidity,
            temp_min:weather[i].temp_min,
            temp_max:weather[i].temp_max
      }
}
}
      console.log(weather);
      return res.send(weather);

    }
  });

});



router.post('/insert',function(req,res){
//console.log(req.body);

var weather=new weatherModel({
    //movie.Title:req.body.Title,
    cod:req.body.cod,
    name:req.body.name,
    id:req.body.id,
    main:{temp:req.body.temp,
     pressure:req.body.pressure,
     humidity:req.body.humidity,
     temp_min:req.body.temp_min,
     temp_max:req.body.temp_max
}
});
console.log(weather);
  weather.save(function(err){
    if(err){
      return console.log(err);
    }
    else{
      console.log('inserted');
    }
})

  res.send(weather);
//  res.send('movies added successfully');
});

module.exports=router;
