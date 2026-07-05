const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const { renderShop } = require('../helpers/renderShop');
const { findCategoryMeta } = require('../config/megaMenuCategories');
const {
    guessBrand,
    productTitleRemainder,
    priceBreakdown,
    deterministicRating,
    deterministicReviewCount,
    deterministicStarHistogram,
    deterministicFitStats
} = require('../helpers/productPage');

const ROOT_ID_TO_DEPT = { men: 'men', women: 'women', kids: 'kids' };

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
            shopFormPath: '/shop',
            activeDepartment: ''
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

router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const error = req.flash('error');
        const success = req.flash('success');
        const user = await userModel
            .findOne({ email: req.user.email })
            .populate('cart');

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        const cartItems = (user.cart || []).filter(Boolean);
        const orderCount = Array.isArray(user.orders) ? user.orders.length : 0;
        const spentEstimate = cartItems.reduce((sum, item) => {
            const price = Number(item.price) || 0;
            const discount = Number(item.discount) || 0;
            return sum + Math.max(0, price - discount);
        }, 0);

        const initials = String(user.fullName || 'U')
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0].toUpperCase())
            .join('');

        res.render('profile', {
            error,
            success,
            loggedIn: true,
            user,
            cartItems,
            orderCount,
            spentEstimate,
            initials
        });
    } catch (err) {
        req.flash('error', 'Unable to load profile right now');
        res.redirect('/');
    }
});

router.get('/order-tracking', isLoggedIn, async (req, res) => {
    try {
        const error = req.flash('error');
        const success = req.flash('success');
        const user = await userModel
            .findOne({ email: req.user.email })
            .populate('cart');

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        const rawOrders = Array.isArray(user.orders) ? user.orders : [];
        const normalizedOrders = rawOrders.map((entry, idx) => {
            const obj = entry && typeof entry === 'object' ? entry : {};
            const amount = Number(obj.amount || obj.total || obj.bill) || 0;
            const placedAt = obj.placedAt || obj.createdAt || obj.date || null;
            const statusRaw = String(obj.status || 'processing').toLowerCase();
            const status = ['processing', 'shipped', 'out for delivery', 'delivered', 'cancelled'].includes(statusRaw)
                ? statusRaw
                : 'processing';
            const codeBase = obj.orderId || obj.code || obj.id || `${Date.now()}${idx}`;
            const orderCode = `NR-${String(codeBase).replace(/[^a-z0-9]/gi, '').slice(-8).toUpperCase()}`;
            const itemCount = Number(obj.itemCount || obj.items || 1) || 1;
            const payment = obj.payment || 'Prepaid';

            return {
                orderCode,
                amount,
                placedAt,
                status,
                itemCount,
                payment
            };
        });

        const fallbackOrders = (user.cart || [])
            .filter(Boolean)
            .slice(0, 3)
            .map((item, idx) => {
                const amount = Math.max(
                    0,
                    (Number(item.price) || 0) - (Number(item.discount) || 0)
                );
                const shortId = String(item._id || idx).replace(/[^a-z0-9]/gi, '').slice(-8).toUpperCase();
                return {
                    orderCode: `NR-${shortId || `00${idx + 1}`}`,
                    amount,
                    placedAt: item.date || new Date(),
                    status: idx === 0 ? 'out for delivery' : (idx === 1 ? 'shipped' : 'processing'),
                    itemCount: 1,
                    payment: idx === 2 ? 'Cash on Delivery' : 'Prepaid'
                };
            });

        const orders = normalizedOrders.length ? normalizedOrders : fallbackOrders;

        const statusCount = orders.reduce((acc, o) => {
            acc[o.status] = (acc[o.status] || 0) + 1;
            return acc;
        }, {});

        res.render('orders', {
            error,
            success,
            loggedIn: true,
            user,
            orders,
            statusCount
        });
    } catch (err) {
        req.flash('error', 'Unable to load orders right now');
        res.redirect('/');
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
        req.flash('success', 'Added to your bag');
        res.redirect(`/product/${productId}`);
    } catch (err) {
        req.flash('error', 'Unable to add product to cart right now');
        res.redirect('/shop');
    }
});

router.get('/product/:id', isLoggedIn, async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Product not found');
            return res.redirect('/shop');
        }

        let error = req.flash('error');
        let success = req.flash('success');
        const product = await productModel.findById(id);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/shop');
        }

        const categorySlug = String(product.category || '').trim();
        const categoryMeta = categorySlug ? findCategoryMeta(categorySlug) : null;
        const brand = guessBrand(product.name);
        const subtitleLine =
            productTitleRemainder(product.name, brand).trim() || product.name;

        const pb = priceBreakdown(product.price, product.discount);
        const rating = deterministicRating(String(product._id));
        const reviewCount = deterministicReviewCount(String(product._id));

        const similarQuery = categorySlug ? { category: categorySlug } : {};
        let similarProducts = await productModel
            .find({ _id: { $ne: product._id }, ...similarQuery })
            .sort({ date: -1 })
            .limit(14);

        if (similarProducts.length < 6) {
            const extraIds = similarProducts.map((p) => p._id);
            extraIds.push(product._id);
            const fillers = await productModel
                .find({
                    _id: { $nin: extraIds }
                })
                .sort({ date: -1 })
                .limit(14 - similarProducts.length);
            similarProducts = [...similarProducts, ...fillers];
        }

        const productCode =
            `NR-${String(product._id).replace(/[^a-f0-9]/gi, '').slice(-8).toUpperCase()}`;

        const idStr = String(product._id);
        const starHistogram = deterministicStarHistogram(idStr, reviewCount);
        const fitStats = deterministicFitStats(idStr);

        const deptForBreadcrumb = categoryMeta
            ? ROOT_ID_TO_DEPT[categoryMeta.rootId] || ''
            : '';
        const aisleShopHref = categorySlug
            ? `/shop?category=${encodeURIComponent(categorySlug)}`
            : deptForBreadcrumb
                ? `/shop?department=${encodeURIComponent(deptForBreadcrumb)}`
                : '/shop';

        res.render('product-detail', {
            error,
            success,
            product,
            loggedIn: true,
            categoryMeta,
            categorySlug,
            brand,
            subtitleLine,
            rating,
            reviewCount,
            pb,
            similarProducts,
            productCode,
            starHistogram,
            fitStats,
            deptForBreadcrumb,
            aisleShopHref
        });
    } catch (err) {
        req.flash('error', 'Unable to load this product');
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
            shopFormPath: '/discounted-products',
            activeDepartment: ''
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
            shopFormPath: '/new-collection',
            activeDepartment: ''
        });
    }
});

module.exports = router;