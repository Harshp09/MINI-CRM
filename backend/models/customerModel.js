// backend/models/customerModel.js
const db = require('../config/db');

const addCustomer = (customer, callback) => {
    const query = 'INSERT INTO customers (name, email, total_spends, visits, last_visit) VALUES (?, ?, ?, ?, ?)';
    const values = [customer.name, customer.email, customer.total_spends, customer.visits, customer.last_visit];
    db.query(query, values, callback);
};

const getAudienceSize = (rules, callback) => {
    let query = 'SELECT COUNT(*) AS size FROM customers WHERE 1=1';
    const values = [];

    rules.forEach((rule) => {
        query += ` AND ${rule.field} ${rule.condition} ?`;
        values.push(rule.value);
    });

    console.log('Generated SQL query:', query);
    console.log('With values:', values);

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return callback(err);
        }
        console.log('Query results:', results);
        callback(null, results[0].size);
    });
};

module.exports = { addCustomer, getAudienceSize };
