// backend/consumers/ingestConsumer.js
const amqp = require('amqplib/callback_api');
const customerModel = require('../models/customerModel');
const orderModel = require('../models/orderModel');

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) throw error0;
    connection.createChannel((error1, channel) => {
        if (error1) throw error1;
        const queue = 'ingest_queue';

        channel.assertQueue(queue, { durable: true });
        channel.consume(queue, (msg) => {
            const message = JSON.parse(msg.content.toString());
            const { type, data } = message;

            if (type === 'customer') {
                customerModel.addCustomer(data, (err, results) => {
                    if (err) {
                        console.error('Error adding customer: ', err);
                    } else {
                        console.log('Customer added: ', results);
                    }
                });
            } else if (type === 'order') {
                orderModel.addOrder(data, (err, results) => {
                    if (err) {
                        console.error('Error adding order: ', err);
                    } else {
                        console.log('Order added: ', results);
                    }
                });
            }

            channel.ack(msg);
        });
    });
});
