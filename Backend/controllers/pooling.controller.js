const PooledRide = require("../models/pooledRide.model");

exports.shareRideForPooling = async (req, res) => {
  try {
    const { rideId, user, pickup, destination, scheduledTime, contactInfo, note } = req.body;

    const newPooledRide = new PooledRide({
      rideId,
      user,
      pickup,
      destination,
      scheduledTime,
      contactInfo,
      note
    });

    const saved = await newPooledRide.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error in shareRideForPooling:", error);
    res.status(500).json({ message: "Failed to share ride." });
  }
};

exports.getAllPooledRides = async (req, res) => {
  try {
    const rides = await PooledRide.find().sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (error) {
    console.error("Error in getAllPooledRides:", error);
    res.status(500).json({ message: "Failed to fetch pooled rides." });
  }
};
