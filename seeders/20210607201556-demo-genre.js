const genres = require('../stubs/genres.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('genre', genres.map(({ id, name }) => ({ id, name })), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('genre', null, {});
  },
};
