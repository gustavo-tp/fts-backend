const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const CollectionCsvController = require('./controllers/CollectionCsvController');
const ExemplariesController = require('./controllers/ExemplariesController');
const ExemplariesFullTextSearchController = require('./controllers/ExemplariesFullTextSearchController');
const ExemplariesSimpleSearchController = require('./controllers/ExemplariesSimpleSearchController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post(
  '/collection',
  upload.single('collection'),
  CollectionCsvController.store
);

routes.get('/exemplaries/fts', ExemplariesFullTextSearchController.index);
routes.get('/exemplaries/nofts', ExemplariesSimpleSearchController.index);

routes.post('/exemplaries', ExemplariesController.store);

module.exports = routes;
