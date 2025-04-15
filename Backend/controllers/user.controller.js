const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("🛑 Validation errors:", errors.array()); // ✅ debug log
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, phone, password } = req.body;

  const isUserAlready = await userModel.findOne({
    $or: [{ email }, { phone }]
  });

  if (isUserAlready) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    phone,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  const { password: _, ...safeUser } = user.toObject();
  res.status(201).json({ token, user: safeUser });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { identifier, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      { email: identifier },
      { phone: identifier }
    ]
  }).select('+password');

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = user.generateAuthToken();
  const { password: _, ...safeUser } = user.toObject();
  res.status(200).json({ token, user: safeUser });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token provided for logout' });
  }

  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: 'Logged out successfully' });
};
