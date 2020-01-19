const { Router } = require('express');

const routers = Router();

routers.get('/users', (req, res) => {
  res.json([
    {
      name: 'david',
    },
  ]);
});

module.exports = routers;
