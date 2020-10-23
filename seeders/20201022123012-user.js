'use strict';
const { users } = require('../data/data')

module.exports = {
  up: async (queryInterface) => {
    try {
      const demoUser = await users();
      return queryInterface.bulkInsert('Users', demoUser, {});
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
