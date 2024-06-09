// backend/controllers/campaignController.js
const campaignModel = require('../models/campaignModel');
const customerModel = require('../models/customerModel');

const createCampaign = (req, res) => {
    const campaign = req.body;

    campaignModel.createCampaign(campaign, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Campaign created', campaignId: result.insertId });
        }
    });
};

const getCampaigns = (req, res) => {
    campaignModel.getCampaigns((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
};

const sendCommunication = (req, res) => {
    const log = req.body;

    campaignModel.logCommunication(log, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
            campaignModel.updateCommunicationStatus(result.insertId, status, (err, updateResult) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json({ message: 'Communication sent', status });
                }
            });
        }
    });
};

const calculateAudienceSize = (req, res) => {
    const { rules } = req.body;
    console.log('Received rules for audience size calculation:', rules);

    customerModel.getAudienceSize(rules, (err, size) => {
        if (err) {
            console.error('Error calculating audience size:', err);
            res.status(500).json({ error: err.message });
        } else {
            console.log('Calculated audience size:', size);
            res.status(200).json({ size });
        }
    });
};

module.exports = { createCampaign, getCampaigns, sendCommunication, calculateAudienceSize };
