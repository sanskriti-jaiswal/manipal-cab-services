const rideModel = require('../models/ride.model');
const mapService= require('../services/maps.service');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        mini: 50,
        sedan: 70,
        suv: 90,
        traveller: 120
    };

    const perKmRate = {
        mini: 12,
        sedan: 15,
        suv: 18,
        traveller: 20
    };

    const perMinuteRate = {
        mini: 2,
        sedan: 2.5,
        suv: 3,
        traveller: 4
    };

    const fare = {
        mini: Math.round(
            baseFare.mini +
            (distanceTime.distance.value / 1000) * perKmRate.mini +
            (distanceTime.duration.value / 60) * perMinuteRate.mini
        ),
        sedan: Math.round(
            baseFare.sedan +
            (distanceTime.distance.value / 1000) * perKmRate.sedan +
            (distanceTime.duration.value / 60) * perMinuteRate.sedan
        ),
        suv: Math.round(
            baseFare.suv +
            (distanceTime.distance.value / 1000) * perKmRate.suv +
            (distanceTime.duration.value / 60) * perMinuteRate.suv
        ),
        traveller: Math.round(
            baseFare.traveller +
            (distanceTime.distance.value / 1000) * perKmRate.traveller +
            (distanceTime.duration.value / 60) * perMinuteRate.traveller
        )
    };

    return fare;
}


module.exports.getFare = getFare;
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);


    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}
