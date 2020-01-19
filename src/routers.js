const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routers = Router();

routers.get('/devs', DevController.getList);

routers.delete('/devs/:id', DevController.destroy);

routers.post('/devs', DevController.create);

module.exports = routers;
