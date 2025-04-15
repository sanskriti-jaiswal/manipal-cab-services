const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
  firstname, lastname, email, phone, password,
  cabAgency, color, plate, capacity, vehicleType
}) => {
  if (!firstname || !lastname || !email || !phone || !password || !cabAgency || !color || !plate || !capacity || !vehicleType) {
    throw new Error('All fields are required');
  }

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    phone, // ✅ Add here
    password,
    cabAgency,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType
    }
  });

  return captain;
};
