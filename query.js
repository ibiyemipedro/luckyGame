// Sample Query File

const { User, Treasure, MoneyValue } = require('./models');

const Sequelize = require('sequelize');

const Op = Sequelize.Op


const findAllWithTreasures = async () => {
  const treasure = await Treasure.findAll({
    include: [{
      model: MoneyValue
    }]
  });
  console.log("All Treasure with their associated MoneyValue:", JSON.stringify(treasure, null, 4));
}

const run = async () => {
  await findAllWithTreasures()
  await process.exit()
}

run()