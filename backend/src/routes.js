const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userController');
const centuryController = require('./controllers/centuryController');

// User controller
routes.post('/admin/registerAdmin', userController.store);
routes.post('/admin/loginAdmin', userController.index);

// Century controller
routes.post('/admin/registerCentury', centuryController.store);

module.exports = routes;