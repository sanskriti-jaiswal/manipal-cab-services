// routes/map.routes.js
const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');

// 1. Geocode address
router.get('/get-coordinates',
    authMiddleware.authUser, // ✅ Add auth
    query('address').isString().isLength({ min: 3 }),
    mapController.getCoordinates
);


// 2. Get distance + duration
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

// 3. Autocomplete input
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
);

module.exports = router; 
