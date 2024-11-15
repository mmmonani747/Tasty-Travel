const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const jwtSecret = "your_jwt_secret_key"; 


router.post('/createuser', async (req, res) => {
    const { name, email, password, phon_no, cnpassword } = req.body;

    try {

        if (password !== cnpassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }


        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        user = new User({
            name,
            email,
            password: hashedPassword, 
            phon_no
        });
        await user.save();


        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ success: true, authToken, message: "User registered successfully" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: "Server error, please try again" });
    }
});

module.exports = router;


