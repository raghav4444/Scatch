const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const path = require('path');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Connect to MongoDB
const db = require('./config/mongoose-connect');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const userRouter = require('./routes/usersRouter');
const ownerRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');

app.use('/users', userRouter);
app.use('/owners', ownerRouter);
app.use('/products', productRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});