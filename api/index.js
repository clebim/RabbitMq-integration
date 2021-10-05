const publisher = require('./publisherMessage');
const amqpConfig = require('../config');

async function publishMessageToDrinksDepartament() {
  const message = {
    table: 3,
    drink: 'Beer',
  };

  await publisher.publisherMessage(amqpConfig.drinksAccountQueue , 'Drinks' , message);
}

async function publishMessageToSandwichDepartament() {
  const message = {
    table: 4,
    drink: 'Burguer',
  };

  await publisher.publisherMessage(amqpConfig.sandwichAccountQueue , 'Sandwich' , message);
}

async function publishMessageToPlatesDepartament() {
  const message = {
    table: 4,
    drink: 'Macarrone',
  };

  await publisher.publisherMessage(amqpConfig.platesAccountQueue , 'Plates' , message);
}

async function publishMessageToDessertsDepartament() {
  const message = {
    table: 5,
    drink: 'Bolo',
  };

  await publisher.publisherMessage(amqpConfig.dessertsAccountQueue , 'Desserts' , message);
}

const publishers = [
  publishMessageToDrinksDepartament(),
  publishMessageToSandwichDepartament(),
  publishMessageToPlatesDepartament(),
  publishMessageToDessertsDepartament(),
]

for(var i = 0; i < 4; i++) {
  publishers[i];
}