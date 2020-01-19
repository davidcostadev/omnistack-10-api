const axios = require('axios');
const get = require('lodash.get');
const Dev = require('../models/Dev');

const create = async (req, res) => {
  const { githubUserName, techs, latitude, longitude } = req.body;

  try {
    let dev = await Dev.findOne({
      githubUserName,
    });

    if (dev) {
      return res.status(422).json({
        error: 'This user is already registered',
      });
    }

    const response = await axios.get(`https://api.github.com/users/${githubUserName}`);
    const { name = login, avatar_url: avatarUrl, bio } = response.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const location = {
      type: 'Point',
      coordinates: [latitude, longitude],
    };

    dev = await Dev.create({
      githubUserName,
      name,
      avatarUrl,
      bio,
      techs: techsArray,
      location,
    });

    return res.json(dev);
  } catch (error) {
    const response = {
      error: get(error, 'response.data.message', error.message),
    };
    console.error(response);
    return res.status(get(error, 'response.status', 400)).json();
  }
};

const getList = async (req, res) => {
  try {
    const devs = await Dev.find();
    res.json(devs);
  } catch (error) {
    const response = {
      error: get(error, 'response.data.message', error.message),
    };
    console.error(response);

    return res.status(get(error, 'response.status', 400)).json(response);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await Dev.findOneAndDelete(id);

    res.status(204).send();
  } catch (error) {
    const response = {
      error: get(error, 'response.data.message', error.message),
    };
    console.error(response);
    return res.status(get(error, 'response.status', 400)).json(response);
  }
};

module.exports = {
  create,
  getList,
  destroy,
};
