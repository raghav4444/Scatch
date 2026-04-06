const ownerModel = require('../models/owners-model');

module.exports = async (req, res, next) => {
    try {
        let owners = await ownerModel.find();
        if (owners.length === 0) {
            req.flash('error', 'No owner configured yet');
            return res.redirect('/');
        }
        
        // We expect req.user to be set by isLoggedIn middleware
        if (!req.user) {
            req.flash('error', 'You must be logged in as owner to access this page');
            return res.redirect('/');
        }
        
        // Check if the current logged-in user is an owner
        let isOwner = owners.some(owner => owner.email === req.user.email);
        
        if (!isOwner) {
            req.flash('error', 'You do not have permissions to access this page');
            return res.redirect('/');
        }
        
        next();
    } catch (error) {
        req.flash('error', 'Something went wrong while verifying owner permissions');
        return res.redirect('/');
    }
};
