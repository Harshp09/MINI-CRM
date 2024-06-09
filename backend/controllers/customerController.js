// backend/controllers/customerController.js
const customerModel = require('../models/customerModel');
const amqp = require('amqplib/callback_api');

const addCustomer = (req, res) => {
    const customer = req.body;
    // Validate customer data here

    // Publish to RabbitMQ
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) throw error0;
        connection.createChannel((error1, channel) => {
            if (error1) throw error1;
            const queue = 'ingest_queue';
            const msg = JSON.stringify({ type: 'customer', data: customer });

            channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });

    res.status(202).json({ message: 'Customer data received' });
};

module.exports = { addCustomer };
