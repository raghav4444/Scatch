const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const { renderShop } = require('../helpers/renderShop');

router.get('/', (req, res) => {
    let error = req.flash('error');
    let loggedIn = false;
    if (req.cookies && req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_KEY);
            loggedIn = true;
        } catch(err) {
            loggedIn = false;
        }
    }
    res.render('index', { error, loggedIn });
});

router.get('/shop', isLoggedIn, async (req, res) => {
    try {
        await renderShop(req, res, { baseQuery: {} });
    } catch (err) {
        req.flash('error', 'Unable to load products right now');
        res.render('shop', {
            error: req.flash('error'),
            success: req.flash('success'),
            products: [],
            loggedIn: !!req.user,
            activeCategorySlug: '',
            categoryMeta: null,
            categoryFilterActive: false,
            unknownCategorySlug: '',
            shopFormPath: '/shop'
        });
    }
});

router.get('/cart', isLoggedIn, async (req, res) => {
    try {
        let error = req.flash('error');
        let success = req.flash('success');
        const user = await userModel.findOne({ email: req.user.email }).populate('cart');
        const cartProducts = (user?.cart || []).filter(Boolean);

        const bill = cartProducts.reduce((acc, product) => {
            const price = Number(product.price) || 0;
            const discount = Number(product.discount) || 0;
            return acc + (price - discount);
        }, 0);

        res.render('cart', { error, success, products: cartProducts, bill, loggedIn: true });
    } catch (err) {
        req.flash('error', 'Unable to load cart right now');
        res.render('cart', { error: req.flash('error'), success: req.flash('success'), products: [], bill: 0, loggedIn: !!req.user });
    }
});


router.get('/add-to-cart/:productId', isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.productId;
        const user = await userModel.findOne({ email: req.user.email });

        // Add product to cart logic
        let product = await productModel.findById(productId);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/shop');
        }

        const alreadyInCart = user.cart.some((id) => id.toString() === productId);
        if (!alreadyInCart) {
            user.cart.push(productId);
        }

        await user.save();
        req.flash('success', 'Product added to cart successfully');
        res.redirect('/shop');
    } catch (err) {
        req.flash('error', 'Unable to add product to cart right now');
        res.redirect('/shop');
    }
});

router.get('/discounted-products', isLoggedIn, async (req, res) => {
    try {
        await renderShop(req, res, { baseQuery: { discount: { $gt: 0 } } });
    } catch (err) {
        req.flash('error', 'Unable to load products right now');
        res.render('shop', {
            error: req.flash('error'),
            success: req.flash('success'),
            products: [],
            loggedIn: !!req.user,
            activeCategorySlug: '',
            categoryMeta: null,
            categoryFilterActive: false,
            unknownCategorySlug: '',
            shopFormPath: '/discounted-products'
        });
    }
});

router.get('/new-collection', isLoggedIn, async (req, res) => {
    try {
        const since = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
        await renderShop(req, res, {
            baseQuery: { date: { $gt: since } },
            forceSort: { date: -1 }
        });
    } catch (err) {
        req.flash('error', 'Unable to load products right now');
        res.render('shop', {
            error: req.flash('error'),
            success: req.flash('success'),
            products: [],
            loggedIn: !!req.user,
            activeCategorySlug: '',
            categoryMeta: null,
            categoryFilterActive: false,
            unknownCategorySlug: '',
            shopFormPath: '/new-collection'
        });
    }
});

module.exports = router;