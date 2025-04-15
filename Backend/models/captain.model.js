const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      minLength: [3, 'Last name must be at least 3 characters long'],
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^[6-9]\d{9}$/, 'Invalid phone number']
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  cabAgency: {
    type: String,
    required: [true, 'Cab agency is required'],
    enum: ['Shree Ram Travels', 'Hare Travells', 'Kavya Cab Services']
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, 'Color must be at least 3 characters long'],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, 'Plate must be at least 3 characters long'],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1'],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['Mini', 'Sedan', 'SUV', 'Traveller']
    }
  },
  location: {
    lat: Number,
    lng: Number,
  }
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;
