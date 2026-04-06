const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cokieParser = require('cookie-parser');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = 
    async (req, res) => {
        try{
            let fullName = req.body.fullName || req.body.fullname; // issey dono fullname ya fullName chalega
            let {email, password} = req.body;

            if (!fullName || !email || !password) {
                req.flash('error', 'Full Name, Email and Password are required');
                return res.status(400).redirect('/register');
            }

            let existingUser = await userModel.findOne({email});
            if (existingUser) {
                req.flash('success', 'You Already have an account, Please login');
                return res.status(400).redirect('/');
            }

            const hash = await bcrypt.hash(password, 10);
            let createdUser = await userModel.create({
                fullName,
                email,
                password: hash
            });

            const token = generateToken(createdUser);
            res.cookie('token', token);
            req.flash('success', 'Registration successful, You are now logged in');
            res.status(201).redirect("/shop");
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

module.exports.loginUser = 
    async (req, res) => {
        try {
            let {email, password} = req.body;
            let user = await userModel.findOne({email});
            if (!user) {
                req.flash('error', 'User not found, Please register first');
                return res.status(400).redirect('/');
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                if (!isMatch) {
                    req.flash('error', 'Invalid email or password');
                    return res.status(400).redirect('/');
                }
                const token = generateToken(user);
                res.cookie('token', token);
                res.status(200).redirect('/shop'); // Redirect to shop page after successful login
                
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
module.exports.logoutUser = 
    async (req, res) => {
    res.clearCookie('token');
    res.status(200).redirect("/"); // Redirect to home page after logout
}