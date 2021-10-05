const amqp = require('amqplib');
const amqpOptions = require('../config');
const consumer = require('./consumerMessage');

const connectOptions = {
  hostname: amqpOptions.hostname,
  port: amqpOptions.port,
};

async function createConnection() {
  try {
    const connection = await amqp.connect(connectOptions);
    await consumer.processMessage(connection);
  } catch (error) {
    console.log(error);
  }
}

createConnection();