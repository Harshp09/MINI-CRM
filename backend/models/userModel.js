// backend/models/userModel.js
const db = require('../config/db');

const findOrCreateUser = (profile, callback) => {
    const query = 'SELECT * FROM users WHERE google_id = ?';
    db.query(query, [profile.id], (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            const insertQuery = 'INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)';
            const values = [profile.id, profile.displayName, profile.emails[0].value];
            db.query(insertQuery, values, (err, results) => {
                if (err) return callback(err);
                return callback(null, { id: results.insertId, ...profile });
            });
        }
    });
};

module.exports = { findOrCreateUser };
