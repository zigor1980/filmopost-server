const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  }, {
    underscore: true,
    tableName: 'user',
    modelName: 'user',
    timestamps: false,
  });

  User.associate = function (models) {
    User.hasMany(models.Rating, { foreignKey: 'user_id' });
    User.belongsToMany(models.Film, { through: models.Rating, foreignKey: 'user_id' });
  };

  return User;
};
