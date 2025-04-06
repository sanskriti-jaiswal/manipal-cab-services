const mongoose = require("mongoose");

const pooledRideSchema = new mongoose.Schema({
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ride",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("PooledRide", pooledRideSchema);
