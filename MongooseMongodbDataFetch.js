const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log('Server started on port '+port);
});

mongoose.connect('mongodb://localhost:27017/world_cities', {useNewUrlParser: true});
var conn = mongoose.connection;

const citySchema = new mongoose.Schema({
    city: String, 
    lat: Number,
    lng: Number,
    country: String,
    population: Number
}, {
    collection: 'city_data'   
});

conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;

// Get the city details
userTable=mongoose.model('world_cities', citySchema);

userTable.findOne({'city': 'Helsinki'}, 'lat lng population', function(err, cityData) {
    if (err) return handleError(err);
    console.log(cityData.lat, cityData.lng, cityData.population);
});
  