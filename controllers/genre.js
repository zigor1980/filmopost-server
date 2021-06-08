const { sequelize } = require('../models/sequilize');

const { Genre } = sequelize.models;

module.exports = {
  fetch: async (req, res) => {
    try {
      const instance = await Genre.findAll();

      res.send(instance);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
};
