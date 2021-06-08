const { v4: uuid } = require('uuid');
const { sequelize } = require('../models/sequilize');

const { User, Film } = sequelize.models;

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      const instance = await User.create({
        id: uuid(),
        ...body,
      }, {
        returning: true,
      });

      res.send(instance);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
  getById: async (req, res) => {
    try {
      const { params: { id } } = req;
      const instance = await User.findOne({
        where: {
          id,
        },
        include: [{
          model: Film,
        }],
        attributes: {
          exclude: ['password'],
        },
        returning: true,
      });

      console.log(instance);
      res.send(instance);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
  update: async (req, res) => {
    try {
      const { params: { id }, body } = req;
      const instance = await User.update(body, {
        where: {
          id,
        },
        returning: true,
      });
      res.send(instance);
    } catch (error) {
      res.status(404).send();
    }
  },
  remove: async (req, res) => {
    try {
      const { params: { id } } = req;
      await User.destroy({
        where: {
          id,
        },
      });
      res.status(204).send();
    } catch (error) {
      res.status(404).send();
    }
  },
};
