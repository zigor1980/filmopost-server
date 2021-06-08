const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Film = sequelize.define('Film', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  }, {
    underscore: true,
    tableName: 'film',
    modelName: 'film',
    timestamps: false,
  });

  Film.associate = function (models) {
    Film.hasMany(models.Rating, { foreignKey: 'film_id' });
    Film.belongsToMany(models.User, { through: models.Rating, foreignKey: 'film_id' });
    Film.belongsToMany(models.Genre, { through: models.GenreFilm, foreignKey: 'filmId' });
  };

  return Film;
};
