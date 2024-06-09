// backend/controllers/orderController.js
const orderModel = require('../models/orderModel');
const amqp = require('amqplib/callback_api');

const addOrder = (req, res) => {
    const order = req.body;
    // Validate order data here

    // Publish to RabbitMQ
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) throw error0;
        connection.createChannel((error1, channel) => {
            if (error1) throw error1;
            const queue = 'ingest_queue';
            const msg = JSON.stringify({ type: 'order', data: order });

            channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });

    res.status(202).json({ message: 'Order data received' });
};

module.exports = { addOrder };
