const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.flash('error', 'You must be logged in to access this page');
        return res.redirect('/');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({email: decoded.email}).select('-password'); // select('-password') issey password nhi milega/ya nhi chaheye

        req.user = user; // request mai user name ki field mai user ka data store kar diya
        next(); // next() issey agle middleware ya route handler pe chala jayega
    } catch (error) {
        req.flash('error', 'Invalid token');
        return res.redirect('/');
    }
};