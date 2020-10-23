'use strict';
const { moneyValue } = require('../data/data')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const demoMoneyValue = await moneyValue();
      return queryInterface.bulkInsert('MoneyValues', demoMoneyValue);
    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('MoneyValues', null, {});
  }
};
