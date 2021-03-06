const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
const City = require('../models/city');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
          res.json({success: false, msg: 'Failed to register user'});
        } else {
          res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
console.log(req.body.username);
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
          return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
              const token = jwt.sign({data: user}, config.secret, {  //Original just jwt.sign(user, ...
                expiresIn: 604800 // 1 week
              });
              res.json({
                success: true,
                token: 'JWT '+token,
                user: {
                  id: user._id,
                  name: user.name,
                  username: user.username,
                  email: user.email
                }
              })
            } else {
              return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });    
});    

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}),(req, res, next) => {
    res.json({user: req.user});
});


//Get city data
router.get('/dashboard', (req, res, next) => {
   //const city = req._parsedOriginalUrl.query
   const city= req.headers.city;
   console.log(req);
  // console.log("users.js");

//This works from postman :(
 
 City.getCityDataByCityName(city, (err, city) => {
  if(err) throw err;
  if(!city) {
    return res.json({success: false, msg: 'City not found'});
  }
  res.json({
       city: {
        lat: city.lat,  
        lng: city.lng,
        country: city.country,
        population: city.population,  
        coPopulation: city.CountryPopulation,
        cPopShare: city.CityPopulationShare,          
        cNotes: city.Notes,
        cPollRank: city.PollutionRank,
        cInvScore: city.InnovationRankScore,
        cGDP: city.GDPInBillion,
        cMetroLength: city.MetroLength,
        cMetroRide: city.MetroRides 
      } 
      
  });
  console.log(city);
 });

});

module.exports = router;
