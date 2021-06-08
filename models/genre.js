const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  }, {
    underscore: true,
    tableName: 'genre',
    modelName: 'genre',
    timestamps: false,
  });

  Genre.associate = function (models) {
    Genre.belongsToMany(models.Film, { through: models.GenreFilm, foreignKey: 'genreId' });
  };

  return Genre;
};
