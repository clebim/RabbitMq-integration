const amqpOptions = require('../config');

const assertQueueOptions = {
  durable: true,
};

const consumeOptions = {
  noAck: false,
};

module.exports = {
  async processMessage(connection) {
    const accountQueue = amqpOptions.drinksAccountQueue;
    const channelConsumer = await connection.createChannel();
    await channelConsumer.assertQueue(
      accountQueue,
      assertQueueOptions,
    );
    await channelConsumer.consume(
      accountQueue,
      (message) => {
        const parsedMessage = JSON.parse(message.content.toString());
        console.log('subscribed', message);
        channelConsumer.ack(message, parsedMessage);
      },
      consumeOptions,
    );
  }
}

