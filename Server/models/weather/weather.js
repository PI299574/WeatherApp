var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/////////check db connecyt////
//var mongoose = require('mongoose');
//mongoose.Promise=global.Promise;
//mongoose.connect('mongodb://localhost/test1');

 var Cat = mongoose.model('Cat', { name: String });

 var kitty = new Cat({ name: 'Zild' });
 kitty.save(function (err) {
   if (err) {
     console.log(err);
   } else {
     console.log('meow');
   }
 });


//Defining the mongoose schema for Movie collection
var weatherSchema   = new Schema({
    cod: String,
    name: String,
    id: String,
  main:{ temp: String,
    pressure: String,
    humidity: String,
    temp_min: String,
    temp_max: String
  }
});

module.exports = mongoose.model('weatherModel', weatherSchema);
