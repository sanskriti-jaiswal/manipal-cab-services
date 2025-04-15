const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, phone, password }) => {
  if (!firstname || !email || !password) {
    throw new Error('All fields are required');
  }

  try {
    const user = new userModel({
      fullname: {
        firstname,
        lastname
      },
      email,
      phone, // ✅ make sure this is included
      password
    });

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};
