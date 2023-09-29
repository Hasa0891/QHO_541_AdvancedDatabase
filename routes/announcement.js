const express = require('express');
const announcementController = require('../controllers/announcement');

const routes = express.Router();

routes.get('',announcementController.getAnnouncements);
routes.get('/details/:announcementId',announcementController.getAnnouncementDetails);

module.exports = routes;