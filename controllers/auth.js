const jwt = require('jsonwebtoken');

const { v4: uuid } = require('uuid');
const { sequelize } = require('../models/sequilize');

const { User } = sequelize.models;
const secret = require('../constants/secret');

module.exports = {
  check: (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        return res.status(200).send(user);
      });
    } else {
      res.sendStatus(401);
    }
  },
  signUp: async (req, res) => {
    try {
      const { body } = req;
      console.log(body);
      const { firstName, lastName, ...data } = body;
      const instance = await User.create({
        id: uuid(),
        first_name: firstName,
        last_name: lastName,
        ...data,
      }, {
        returning: true,
      });

      const { password, ...rawUser } = instance.json();

      res.json({
        user: instance,
        accessToken: jwt.sign(rawUser, secret),
      });
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
          password,
        },
        attributes: {
          exclude: ['password'],
        },
      });

      if (user) {
        const accessToken = jwt.sign(user.toJSON(), secret);

        res.json({
          user,
          accessToken,
        });
      } else {
        res.status(404).send('Username or password incorrect');
      }
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  },
};
