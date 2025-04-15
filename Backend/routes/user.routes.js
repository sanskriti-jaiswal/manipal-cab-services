const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
  body('email')
    .optional()
    .isEmail().withMessage('Invalid Email'),
  body('phone')
    .optional()
    .isMobilePhone('en-IN').withMessage('Invalid phone number'),
  body('fullname.firstname')
    .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

router.post('/login', [
  body('identifier').notEmpty().withMessage('Phone or Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password invalid')
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', userController.logoutUser);

module.exports = router;
