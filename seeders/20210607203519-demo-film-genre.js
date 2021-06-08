const genres = require('../stubs/genresFilms.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('GenreFilm', genres.map(([filmId, genreId]) => ({
      filmId, genreId,
    })), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('GenreFilm', null, {});
  },
};
