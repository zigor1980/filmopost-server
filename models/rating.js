const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rating = sequelize.define('Rating', {
    film_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    underscore: true,
    tableName: 'rating',
    modelName: 'rating',
    timestamps: false,
  });

  Rating.removeAttribute('id');

  Rating.associate = function (models) {
    Rating.belongsTo(
      models.User,
      { foreignKey: 'user_id' },
    );
    Rating.belongsTo(
      models.Film,
      { foreignKey: 'film_id' },
    );
  };

  return Rating;
};
