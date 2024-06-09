// backend/models/campaignModel.js
const db = require('../config/db');

const createCampaign = (campaign, callback) => {
    const query = 'INSERT INTO campaigns (name, rules) VALUES (?, ?)';
    const values = [campaign.name, JSON.stringify(campaign.rules)];
    db.query(query, values, callback);
};

const getCampaigns = (callback) => {
    const query = 'SELECT * FROM campaigns ORDER BY created_at DESC';
    db.query(query, callback);
};

const logCommunication = (log, callback) => {
    const query = 'INSERT INTO communications_log (campaign_id, customer_id, status) VALUES (?, ?, ?)';
    const values = [log.campaign_id, log.customer_id, log.status];
    db.query(query, values, callback);
};

const updateCommunicationStatus = (id, status, callback) => {
    const query = 'UPDATE communications_log SET status = ? WHERE id = ?';
    const values = [status, id];
    db.query(query, values, callback);
};

module.exports = { createCampaign, getCampaigns, logCommunication, updateCommunicationStatus };
