const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cokieParser = require('cookie-parser');
const { generateToken } = require('../utils/generateToken');

router.get('/', (req, res) => {
    res.send('User route is working');
});

router.post('/register', async (req, res) => {
    try{

        let {fullName, email, password} = req.body;
        let existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                else{
                    let createdUser = await userModel.create({
                        fullName,
                        email,
                        password: hash
                    });
                    const token = generateToken(createdUser);
                    res.cookie('token', token);
                    res.status(201).send("user created successfully");
                }
            });
        });
    } catch (error) {
        res.status(500).send('Error occurred while registering user');
    }
});

module.exports = router;