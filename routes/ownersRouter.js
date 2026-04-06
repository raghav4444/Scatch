const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');
const productModel = require('../models/product-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isOwner = require('../middlewares/isOwner');

router.get('/', (req, res) => {
    res.send('Owners route is working');
});

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        // res.send('hey its working');
        let owners =await ownerModel.find();
        if(owners.length > 0){
            return res.status(500).send("YOU don't have permissions to create owner");
        }
        let {fullName, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password
        });
        res.status(201).send(createdOwner);
    });
}

router.get('/admin', isLoggedIn, isOwner, async (req, res) => {
    // let owners = await ownerModel.find();
    // if(owners.length === 0){
    //     req.flash('error', 'No owner found, Please create an owner first');
    //     return res.render('createproducts', { success: null, error: req.flash('error') });
    // }
    // elif(req.user.email !== owners[0].email){
    //     req.flash('error', 'You do not have permissions to access this page');
    //     return res.render('index', { error: req.flash('error')});
    // }
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('createproducts', { success, error });
});

router.get('/products', isLoggedIn, isOwner, async (req, res) => {
    let success = req.flash('success');
    let error = req.flash('error');
    let products = await productModel.find();
    res.render('admin', { success, error, products });
});

router.get('/edit-product/:id', isLoggedIn, isOwner, async (req, res) => {
    try {
        let success = req.flash('success');
        let error = req.flash('error');
        let product = await productModel.findById(req.params.id);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/owners/products');
        }
        res.render('editproduct', { success, error, product });
    } catch (err) {
        req.flash('error', 'Something went wrong');
        res.redirect('/owners/products');
    }
});

module.exports = router;