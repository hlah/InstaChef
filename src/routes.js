const express = require('express');
const routes = express.Router();

const controller = require('./app/controllers/controller');

routes.get('/', controller.home);
routes.get('/about', controller.about);
routes.get("/recipes", controller.index); 
routes.get("/recipes/create", controller.create); 
routes.get("/recipes/:index", controller.show); 
routes.get("/recipes/:index/edit", controller.edit); 
routes.post("/recipes", controller.post); 
routes.put("/recipes", controller.put); 
routes.delete("/recipes", controller.delete);  

module.exports = routes;
