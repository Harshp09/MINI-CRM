// backend/models/orderModel.js
const db = require('../config/db');

const addOrder = (order, callback) => {
    const query = 'INSERT INTO orders (customer_id, amount, date) VALUES (?, ?, ?)';
    const values = [order.customer_id, order.amount, order.date];
    db.query(query, values, callback);
};

module.exports = { addOrder };
