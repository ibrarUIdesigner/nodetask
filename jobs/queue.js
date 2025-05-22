const Queue = require("bull");
const shopQueue = new Queue("shop-creation");

const addShopCreationJob = async (data) => {
  console.log("Shop Data");

  await shopQueue.add(data);
};

module.exports = { shopQueue, addShopCreationJob };
