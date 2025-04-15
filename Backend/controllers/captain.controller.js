const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, phone, password, vehicle, cabAgency } = req.body;

  const checkConditions = [];
  if (email) checkConditions.push({ email });
  if (phone) checkConditions.push({ phone });

  if (checkConditions.length) {
    const isCaptainAlreadyExist = await captainModel.findOne({ $or: checkConditions });

    if (isCaptainAlreadyExist) {
      if (isCaptainAlreadyExist.email === email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      if (isCaptainAlreadyExist.phone === phone) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }
      return res.status(400).json({ message: 'Captain already exists' });
    }
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const {
    color,
    plate,
    capacity,
    vehicleType
  } = vehicle || {};

  if (!fullname?.firstname || !fullname?.lastname || !email || !phone || !password || !cabAgency || !color || !plate || !capacity || !vehicleType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    phone,
    password: hashedPassword,
    cabAgency,
    color,
    plate,
    capacity,
    vehicleType
  });

  const token = captain.generateAuthToken();
  const { password: _, ...safeCaptain } = captain.toObject();
  res.status(201).json({ token, captain: safeCaptain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { identifier, password } = req.body;

  const captain = await captainModel.findOne({
    $or: [
      { email: identifier },
      { phone: identifier }
    ]
  }).select('+password');

  if (!captain) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = captain.generateAuthToken();
  const { password: _, ...safeCaptain } = captain.toObject();
  res.status(200).json({ token, captain: safeCaptain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  await blacklistTokenModel.create({ token });
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
