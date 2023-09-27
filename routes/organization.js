const express = require('express');
const orgController = require('../controllers/organization');
const orgDashboardRoutes = require('./orgdashboard');
const upload = require('../utils/upload');
const userMiddleware = require('../middlewares/userMiddleware');

const routes = express.Router();

routes.get('/register',orgController.getRegister);

routes.post('/register',orgController.postRegister);

routes.get('/login',orgController.getLogin);

routes.post('/login',orgController.postLogin);

routes.use('/dashboard',userMiddleware.authMiddleware,orgDashboardRoutes);

routes.get('/verify',userMiddleware.authMiddleware,orgController.getVerify);

routes.post('/verify',userMiddleware.authMiddleware,upload.single('docs_url'),orgController.postVerify);

routes.get('/logout',orgController.getLogout);

module.exports = routes;
