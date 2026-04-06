const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isOwner = require('../middlewares/isOwner');

router.get('/', (req, res) => {
    res.send('Product route is working');
});

router.post('/create', isLoggedIn, isOwner, upload.single('image'), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, pannelcolor, panelcolor, textcolor } = req.body;

        if (!req.file) {
            req.flash('error', 'Product image is required');
            return res.redirect('/owners/admin');
        }

        if (!name || !price) {
            req.flash('error', 'Product name and price are required');
            return res.redirect('/owners/admin');
        }

        await productModel.create({
            image: req.file.buffer,
            name: name,
            price: price,
            discount: discount,
            bgcolor: bgcolor,
            pannelcolor: panelcolor || pannelcolor,
            textcolor: textcolor
        });

        req.flash('success', 'Product created successfully');
        return res.redirect('/owners/admin');
    } catch (error) {
        req.flash('error', 'Unable to create product');
        return res.redirect('/owners/admin');
    }
});

router.post('/update/:id', isLoggedIn, isOwner, upload.single('image'), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, pannelcolor, panelcolor, textcolor } = req.body;
        
        let updateData = {
            name: name,
            price: price,
            discount: discount,
            bgcolor: bgcolor,
            pannelcolor: panelcolor || pannelcolor,
            textcolor: textcolor
        };
        
        if (req.file) {
            updateData.image = req.file.buffer;
        }
        
        await productModel.findByIdAndUpdate(req.params.id, updateData);
        req.flash('success', 'Product updated successfully');
        return res.redirect('/owners/products');
    } catch (error) {
        req.flash('error', 'Unable to update product');
        return res.redirect(`/owners/edit-product/${req.params.id}`);
    }
});

router.post('/delete/:id', isLoggedIn, isOwner, async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        req.flash('success', 'Product deleted successfully');
        return res.redirect('/owners/products');
    } catch (error) {
        req.flash('error', 'Unable to delete product');
        return res.redirect('/owners/products');
    }
});

module.exports = router;