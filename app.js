const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const path = require('path');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

// Connect to MongoDB
const db = require('./config/mongoose-connect');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: process.env.EXPRESSION_KEY || 'dev-session-secret-change-me',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Fallback for environments where connect-flash is not attached on req.
app.use((req, res, next) => {
    if (typeof req.flash === 'function') {
        return next();
    }

    req.flash = (type, message) => {
        req.session = req.session || {};
        req.session.flash = req.session.flash || {};
        req.session.flash[type] = req.session.flash[type] || [];

        if (typeof message !== 'undefined') {
            req.session.flash[type].push(message);
            return req.session.flash[type];
        }

        const messages = req.session.flash[type];
        delete req.session.flash[type];
        return messages;
    };

    next();
}); // This middleware will ensure that req.flash is always available, even if connect-flash is not properly set up. It uses the session to store flash messages and provides a simple API for setting and retrieving them.

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/usersRouter');
const ownerRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/owners', ownerRouter);
app.use('/products', productRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});