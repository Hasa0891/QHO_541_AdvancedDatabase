const Organization = require('../models/organization');

global.organization = false;

exports.setUserMiddleware = async (req, res, next) => {
    if (req.session.organizationId && global.organization===false) {
        const organization = await Organization.findById(req.session.organizationId);
        global.organization = organization;
    }
    next();
}

exports.authMiddleware = async (req, res, next) => {
    if (!organization) {
        console.log("You must Login!");
        return res.redirect('/organization/login');
    }
    next()
}