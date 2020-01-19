const { Router } = require('express');
const axios = require('axios');
const get = require('lodash.get');
const Dev = require('./models/Dev');

const routers = Router();

routers.get('/devs', async (req, res) => {
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
});

routers.delete('/devs/:id', async (req, res) => {
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
});

routers.post('/devs', async (req, res) => {
  const { githubUserName, techs } = req.body;

  try {
    const response = await axios.get(`https://api.github.com/users/${githubUserName}`);
    const { name = login, avatar_url: avatarUrl, bio } = response.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await Dev.create({
      githubUserName,
      name,
      avatarUrl,
      bio,
      techs: techsArray,
    });

    return res.json(dev);
  } catch (error) {
    const response = {
      error: get(error, 'response.data.message', error.message),
    };
    console.error(response);
    return res.status(get(error, 'response.status', 400)).json();
  }
});

module.exports = routers;
