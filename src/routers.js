const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routers = Router();

routers.post('/devs', DevController.create);
routers.get('/devs', DevController.getList);
routers.delete('/devs/:id', DevController.destroy);

routers.get('/search', SearchController.getList);

module.exports = routers;
