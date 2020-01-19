const get = require('lodash.get');
const Dev = require('../models/Dev');
const { stringToArray } = require('../utils/stringToArray');

const getList = async (req, res) => {
  const { latitude, longitude, techs } = req.query;

  try {
    const techArrays = stringToArray(techs);
    const devs = await Dev.find({
      techs: {
        $in: techArrays,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
          $maxDistance: 10000,
        },
      },
    });
    res.json(devs);
  } catch (error) {
    const response = {
      error: get(error, 'response.data.message', error.message),
    };
    console.error(response);
    return res.status(get(error, 'response.status', 400)).json(response);
  }
};

module.exports = {
  getList,
};
