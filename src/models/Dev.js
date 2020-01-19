const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
  name: String,
  githubUserName: String,
  avatarUrl: String,
  techs: [String],
});

module.exports = mongoose.model('Dev', DevSchema);
