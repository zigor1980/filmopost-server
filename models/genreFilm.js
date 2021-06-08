const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GenreFilm = sequelize.define('GenreFilm', {
    filmId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    underscore: true,
    tableName: 'GenreFilm',
    modelName: 'GenreFilm',
    timestamps: false,
  });

  return GenreFilm;
};
