const express = require('express');
const statisticsController = require('../controllers/statistics');

const routes = express.Router();

routes.get('',statisticsController.getStatistics);
routes.post('',statisticsController.postStatistics);

module.exports = routes;