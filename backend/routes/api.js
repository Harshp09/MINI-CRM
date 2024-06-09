// backend/routes/api.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const orderController = require('../controllers/orderController');
const campaignController = require('../controllers/campaignController');

router.post('/customers', customerController.addCustomer);
router.post('/orders', orderController.addOrder);
router.post('/campaigns', campaignController.createCampaign);
router.get('/campaigns', campaignController.getCampaigns);
router.post('/send-communication', campaignController.sendCommunication);
router.post('/audience-size', campaignController.calculateAudienceSize);

module.exports = router;
