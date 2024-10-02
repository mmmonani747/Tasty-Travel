const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const jwtSecret = "your_jwt_secret_key"; // Use a more secure key in production

// Signup Route
router.post('/createuser', async (req, res) => {
    const { name, email, password, phon_no, cnpassword } = req.body;

    try {
        // Check if passwords match
        if (password !== cnpassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        user = new User({
            name,
            email,
            password: hashedPassword, 
            phon_no
        });
        await user.save();

        // Generate JWT token
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

        // Return success response with token
        res.status(200).json({ success: true, authToken, message: "User registered successfully" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: "Server error, please try again" });
    }
});

module.exports = router;


