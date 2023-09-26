const express = require('express');
const adminController = require('../controllers/admin');
const adminMiddleware = require('../middlewares/adminMiddleware');

const routes = express.Router();

routes.get('/login',adminController.getAdminLogin);
routes.post('/login',adminController.postAdminLogin);
routes.get('/logout',adminController.getAdminLogOut);
routes.get('/dashboard',adminMiddleware.authAdminMiddleware,adminController.getAdminDashboard);
routes.get('/approve/:organizationId',adminMiddleware.authAdminMiddleware,adminController.getOrganizationApprove);
routes.get('/decline/:organizationId',adminMiddleware.authAdminMiddleware,adminController.getOrganizationDecline);

module.exports = routes;