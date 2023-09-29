const express = require('express');
const orgDashboardController = require('../controllers/orgdashboard');
const upload = require('../utils/upload');

routes = express.Router();

routes.get('',orgDashboardController.getDashboard);
routes.get('/addannouncement',orgDashboardController.getAddAnnouncement);
routes.post('/addannouncement',upload.single('featured_url'),orgDashboardController.postAddAnnouncement);
routes.get('/announcements',orgDashboardController.getAnnouncements);
routes.get('/announcement/edit/:announcementId',orgDashboardController.getEditAnnouncement);
routes.post('/announcement/edit/:announcementId',orgDashboardController.postEditAnnouncement);
routes.get('/announcement/delete/:announcementId',orgDashboardController.deleteAnnouncement);
routes.get('/adddata',orgDashboardController.getAddData);
routes.post('/adddata',orgDashboardController.postAddData);
routes.get('/addeddata',orgDashboardController.getAddedData);
routes.get('/addeddata/edit/:dataId',orgDashboardController.getEditData);
routes.post('/addeddata/edit/:dataId',orgDashboardController.postEditData);
routes.get('/addeddata/delete/:dataId',orgDashboardController.deleteData);

module.exports = routes;