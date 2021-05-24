const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//var conn = mongoose.connection;

const citySchema = mongoose.Schema({
    city: {
        type: String
    },    
    lat: {
        type: Number
    },    
    lng: {
        type: Number
    },    
    country: {
        type: String
    },    
    population: {
        type: Number
    }    
}, {
    collection: 'cities'   
});



// Get the city details
const City = module.exports = mongoose.model('City', citySchema); // was 'world_cities'
/*var cname = "London"
City.findOne({'city': cname}, 'lat lng population', function(err, cityData) {
    if (err) return handleError(err);
    console.log(cityData.lat, cityData.lng, cityData.population); 
}); */
//This works
console.log(City);
module.exports.getCityDataByCityName = function(city, callback){
    City.findOne({city: city}, callback);
} 
