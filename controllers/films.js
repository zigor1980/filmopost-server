const { v4: uuid } = require('uuid');
const { sequelize, Sequelize } = require('../models/sequilize');

const {
  Film, Rating, User,
} = sequelize.models;

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      console.log(body);
      const instance = await Film.create({
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
  fetch: async (req, res) => {
    try {
      const instance = await Film.findAll({
        include: [{
          model: Rating,
          attributes: [],
        }],
        attributes: {
          include: [[Sequelize.fn('avg', Sequelize.col('rate')), 'rating']],
        },
        group: ['film_id', 'Film.id'],
      });

      console.log(instance);

      res.send(instance);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
  getById: async (req, res) => {
    try {
      const { params: { id } } = req;
      const instance = await Film.findOne({
        where: {
          id,
        },
        include: [{
          model: User,
        }],
        returning: true,
      });
      res.send(instance);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
  rate: async (req, res) => {
    try {
      const { body } = req;
      await Rating.create(body, {
        returning: true,
      });

      const instance = await Film.findOne({
        where: { id: body.film_id },
        include: [
          {
            model: User,
          },
        ],
      });

      console.log(instance);
      res.send(instance);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
  getTopRate: async (req, res) => {
    try {
      const instance = await Film.findAll({
        include: [{
          model: Rating,
          attributes: [[Sequelize.fn('avg', Sequelize.col('rate')), 'rating']],
        }],
        group: ['film_id', 'Film.id'],
        order: [[Sequelize.fn('avg', Sequelize.col('rate')), 'DESC']],
        limit: 5,
      });

      console.log(instance);

      res.send(instance);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
};
