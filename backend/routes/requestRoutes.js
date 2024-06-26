
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

module.exports = (upload) => {
    // Route for creating a new request
    router.post('/create', upload.single('document'), requestController.createRequest);
    return router;
};
