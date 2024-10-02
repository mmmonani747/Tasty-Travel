const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "your_jwt_secret_key"; // Ensure this is securely stored

const router = express.Router();

// Login Route
router.post('/loginuser', async (req, res) => {
    const { email, password } = req.body; // Ensure these fields are sent from the frontend

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare entered password with the stored hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // If password is correct, generate JWT token
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

        // Return success response with the token
        res.json({ success: true, authToken });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;