const amqp = require('amqplib');
const amqpOptions = require('../config');

const connectOptions = {
  hostname: amqpOptions.hostname,
  port: amqpOptions.port,
};

const assertOptions = {
  durable: true,
}

module.exports = {
  async publisherMessage(accountQueue ,routingKey, message) {
    const exchange = amqpOptions.documentExchange;
    const connection = await amqp.connect(connectOptions);
    const channel = await connection.createChannel();
  
    await channel.assertExchange(exchange, 'direct', assertOptions).catch(console.error);
    await channel.assertQueue(accountQueue, assertOptions);
    await channel.bindQueue(accountQueue, exchange, routingKey);
    const buffer = Buffer.from(JSON.stringify(message));
    channel.publish(exchange, routingKey, buffer);
    console.log('message published successfully', message);
    await channel.close();
    await connection.close();
  }
}