const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const DevSchema = new mongoose.Schema({
  name: String,
  githubUserName: String,
  avatarUrl: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

module.exports = mongoose.model('Dev', DevSchema);
