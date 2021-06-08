const genres = require('../stubs/films.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('film', genres.map(({
      id, title, overview, poster_path: posterPath,
    }) => ({
      id,
      title,
      description: overview,
      poster: `https://image.tmdb.org/t/p/w500${posterPath}`,
    })), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('film', null, {});
  },
};
