const express = require('express');
const router = express.Router();
const config = require('../config/database');

const City = require('../models/city');

router.get('/dashboard', (req, res, next) => {
    res.json({city: req.city});
    
});

module.exports = router;