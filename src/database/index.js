const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Exemplary = require('../models/Exemplary');
const Author = require('../models/Author');
const ContentType = require('../models/ContentType');
const Publisher = require('../models/Publisher');
const ExemplaresAcervo = require('../models/ExemplaresAcervo');

const connection = new Sequelize(dbConfig);

Exemplary.init(connection);
Author.init(connection);
ContentType.init(connection);
Publisher.init(connection);
ExemplaresAcervo.init(connection);

Exemplary.associate(connection.models);
Author.associate(connection.models);
ContentType.associate(connection.models);
Publisher.associate(connection.models);
ExemplaresAcervo.associate(connection.models);

module.exports = connection;
