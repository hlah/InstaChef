const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer')

const controller = require('./app/controllers/controller');

routes.get('/', controller.home);
routes.get('/about', controller.about);
routes.get("/recipes", controller.index); 
routes.get("/recipes/create", controller.create); 
routes.get("/recipes/:index", controller.show); 
routes.get("/recipes/:index/edit", controller.edit); 
routes.get("/recipes/:index/execute", controller.execute); 
routes.get("/recipes/:index/checklist", controller.checklist); 
routes.post("/recipes", multer.array('photos', 5), controller.post); 
routes.put("/recipes", multer.array('photos', 5), controller.put); 
routes.delete("/recipes", controller.delete);  

module.exports = routes;
