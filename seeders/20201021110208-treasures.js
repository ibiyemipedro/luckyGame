'use strict';
const { treasure } = require('../data/data')

module.exports = {
  up: async (queryInterface) => {

    try {
      const demoTreasures = await treasure()
      return queryInterface.bulkInsert('Treasures', demoTreasures, {});

    } catch (error) {
      console.log(error)

    }
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Treasures', null, {});
  }
};
