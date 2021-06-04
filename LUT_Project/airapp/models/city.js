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
    },
    CountryPopulation: {
        type: Number
    },
    CityPopulationShare: {
        type: String
    },    
    Notes: {
        type: String
    },
    PollutionRank: {
        type: String
    },
    InnovationRankScore: {
        type: String
    },
    GDPInBillions: {
        type: String
    },
    MetroLength: {
        type: String
    },
    MetroRides: {
        type: String
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

module.exports.getCityDataByCityName = function(city, callback){
    City.findOne({city: city}, callback);
    console.log(city);
} 
