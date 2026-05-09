const productModel = require('../models/product-model');
const { findCategoryMeta } = require('../config/megaMenuCategories');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {{ baseQuery?: object }} options
 */
async function renderShop(req, res, options = {}) {
    const baseQuery = options.baseQuery || {};
    const categorySlug = String(req.query.category || '').trim();
    const query = { ...baseQuery };
    if (categorySlug) {
        query.category = categorySlug;
    }

    const sortOption = {};
    if (options.forceSort && typeof options.forceSort === 'object') {
        Object.assign(sortOption, options.forceSort);
    }
    if (req.query.sortby === 'newest') {
        sortOption.date = -1;
    }

    const products = await productModel.find(query).sort(sortOption);
    const categoryMeta = categorySlug ? findCategoryMeta(categorySlug) : null;

    const shopFormPath =
        req.path === '/discounted-products'
            ? '/discounted-products'
            : req.path === '/new-collection'
              ? '/new-collection'
              : '/shop';

    res.render('shop', {
        error: req.flash('error'),
        success: req.flash('success'),
        products,
        loggedIn: true,
        activeCategorySlug: categorySlug,
        categoryMeta,
        categoryFilterActive: Boolean(categorySlug),
        unknownCategorySlug: categorySlug && !categoryMeta ? categorySlug : '',
        shopFormPath
    });
}

module.exports = { renderShop };
