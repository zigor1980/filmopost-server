const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const sequelize = new Sequelize('d7kmnpujancqm7', 'uviftvgxyvyatg', '010030e4ed50bb1e2352ac4dfffdfdcbc5ae114c49b30f5288b1179fd0e84dd5', {
  host: 'ec2-52-86-2-228.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .map((file) => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file));
    return model(sequelize);
  }).forEach((model) => model.associate && model.associate(sequelize.models));

module.exports = {
  sequelize,
  Sequelize,
};
