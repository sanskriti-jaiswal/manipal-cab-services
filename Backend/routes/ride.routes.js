const express = require('express');
const router = express.Router();
const {body, query}= require('express-validator');
const rideController= require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
authMiddleware.authUser,
body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup location'),
body('destination').isString().isLength({min:3}).withMessage('Invalid destination location'),
body('vehicleType').isString().isIn(['mini', 'sedan', 'suv', 'traveller']).withMessage('Invalid vehicle type'),
rideController.createRide
)


router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup location'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination location'),
    rideController.getFare

)

module.exports = router;