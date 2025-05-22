const { shopQueue } = require("./queue");

const Shop = require("../domain/entities/Shop");

shopQueue.process(async (job) => {
  console.log("Shop Worker", job);
  const { userId } = job.data;
  console.log("Creating shop for user:", userId);

  await Shop.create({
    name: `Shop for user ${userId}`,
    userId,
  });
});
