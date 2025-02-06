const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    try {
        const user = new userModel({  // ✅ Use `new userModel()`
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });

        console.log("Before Save:", user);  // ✅ Debug: Log the user before saving
        await user.save();  // ✅ Ensure the user is actually saved
        console.log("User Saved to DB:", user);  // ✅ Debug: Log after saving

        return user;
    } catch (error) {
        console.error("Error Saving User:", error);  // ✅ Catch MongoDB errors
        throw new Error("Database Error: " + error.message);  // Return a readable error
    }
};
