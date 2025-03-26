const axios = require('axios');
const captainModel = require('../models/captain.model');

// 1. Convert address to coordinates (lat/lng)
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'manipal-cab-service-app/1.0'
            }
        });

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Geocoding error:', error.message);
        throw error;
    }
};

// 2. Get distance and time between two addresses (Formatted Output)
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const originUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(origin)}&format=json&limit=1`;
    const destinationUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`;

    try {
        const [originRes, destRes] = await Promise.all([
            axios.get(originUrl, { headers: { 'User-Agent': 'manipal-cab-service-app/1.0' } }),
            axios.get(destinationUrl, { headers: { 'User-Agent': 'manipal-cab-service-app/1.0' } })
        ]);

        if (!originRes.data.length || !destRes.data.length) {
            throw new Error('Unable to geocode origin or destination');
        }

        const originCoords = originRes.data[0];
        const destCoords = destRes.data[0];

        const routeUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=false`;

        const routeRes = await axios.get(routeUrl);
        if (routeRes.data.routes && routeRes.data.routes.length > 0) {
            const route = routeRes.data.routes[0];
            const distanceInMeters = route.distance;
            const durationInSeconds = route.duration;

            // Format distance (e.g., "1,421 km")
            const km = (distanceInMeters / 1000).toFixed(0);
            const distanceText = `${Number(km).toLocaleString()} km`;

            // Format duration (e.g., "1 day 3 hours")
            const days = Math.floor(durationInSeconds / (60 * 60 * 24));
            const hours = Math.floor((durationInSeconds % (60 * 60 * 24)) / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            const durationParts = [];
            if (days > 0) durationParts.push(`${days} day${days > 1 ? 's' : ''}`);
            if (hours > 0) durationParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
            if (minutes > 0 && days === 0) durationParts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);

            return {
                distance: {
                    text: distanceText,
                    value: distanceInMeters
                },
                duration: {
                    text: durationParts.join(' '),
                    value: durationInSeconds
                },
                status: "OK"
            };
        } else {
            throw new Error('No route found');
        }

    } catch (err) {
        console.error('Distance/route error:', err.message);
        throw err;
    }
};

// 3. Autocomplete using Photon API
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`;

    try {
        const response = await axios.get(url);
        return response.data.features.map((f) => {
            const name = f.properties.name || '';
            const city = f.properties.city || '';
            const state = f.properties.state || '';
            const country = f.properties.country || '';
            const fullAddress = [name, city, state, country].filter(Boolean).join(', ');

            // structured_formatting
            const structured_formatting = {
                main_text: name,
                secondary_text: [city, state, country].filter(Boolean).join(', '),
                main_text_matched_substrings: [{
                    length: input.length,
                    offset: 0
                }]
            };

            // terms (split on ", ")
            let currentOffset = 0;
            const terms = fullAddress.split(', ').map(term => {
                const offset = fullAddress.indexOf(term, currentOffset);
                currentOffset = offset + term.length;
                return { offset, value: term };
            });

            return {
                description: fullAddress,
                place_id: f.properties.osm_id?.toString() || null,
                reference: f.properties.osm_id?.toString() || null,
                structured_formatting,
                matched_substrings: [{
                    length: input.length,
                    offset: 0
                }],
                terms,
                types: ['establishment'] // fake types, since Photon doesn't provide them
            };
        });
    } catch (err) {
        console.error('Autocomplete error:', err.message);
        throw err;
    }
};


// 4. MongoDB Geo Query to find nearby captains
module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371]
            }
        }
    });
    return captains;
};
