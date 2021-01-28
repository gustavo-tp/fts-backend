const { QueryTypes } = require('sequelize');

const Exemplary = require('../models/Exemplary');

const AuthorsController = require('./AuthorsController');
const ContentTypesController = require('./ContentTypesController');
const PublishersController = require('./PublishersController');

const { writeJson } = require('../utils/jsonManipulator');

module.exports = {
  async index(request, response) {
    const searchWords = request.query.seachTerms;

    const searchQuery = searchWords.split(' ').join(' & ');

    console.log(searchQuery);

    const result = await Exemplary.sequelize.query(`
      SELECT
        id, title
      FROM search_index
      WHERE 
        document @@ to_tsquery('pt', '${searchQuery}')
      ORDER BY
        ts_rank(document, to_tsquery('pt', '${searchQuery}')) DESC;
    `,
    {
      type: QueryTypes.SELECT
    });

    return response.send(result);
  },

  async store(data) {
    function getAllAuthorsFromData(resolve) {
      const authors = data.map(exemplary => exemplary.autor.trim());

      console.time('distinctAuthors')

      const distinctAuthors = authors.reduce(
        (accumulator, author) => author && !accumulator.includes(author)
          ? [...accumulator, author]
          : accumulator
      );

      console.timeEnd('distinctAuthors')

      console.log('distinctAuthors', distinctAuthors);

      writeJson('authors.json', distinctAuthors);

      console.time('authorsToStore')

      const authorsToStore = distinctAuthors.reduce(
        (accumulator, author, index) => {
          return {
            ids: {...accumulator.ids, [author]: index },
            data: [...accumulator.data, { name: author }]
          }
        }, {
          ids: {},
          data: []
        }
      );

      authorsToStore.data.push({ name: 'Unknown Author' });
      
      console.timeEnd('authorsToStore')

      console.log('authorsToStore', authorsToStore);

      return resolve(authorsToStore);
    }

    function getAllContentTypesFromData(resolve) {
      const contentTypes = data.map(exemplary => exemplary.tipo_material.trim());

      const distinctContentTypes = contentTypes.reduce(
        (accumulator, contentType) => 
          contentType && !accumulator.includes(contentType)
            ? [...accumulator, contentType]
            : accumulator
      );

      writeJson('contentTypes.json', distinctContentTypes);

      const contentTypesToStore = distinctContentTypes.reduce(
        (accumulator, contentType, index) => {
          return {
            ids: {...accumulator.ids, [contentType]: index },
            data: [...accumulator.data, { name: contentType }]
          }
        }, {
          ids: {},
          data: []
        }
      );

      contentTypesToStore.data.push({ name: 'Unknown Content Type' });

      return resolve(contentTypesToStore);
    }

    function getAllPublishersFromData(resolve) {
      const publishers = data.map(exemplary => exemplary.editora.trim());

      const distinctPublishers = publishers.reduce(
        (accumulator, publisher) => publisher && !accumulator.includes(publisher)
          ? [...accumulator, publisher]
          : accumulator
      );

      writeJson('publishers.json', distinctPublishers);

      const publishersToStore = distinctPublishers.reduce(
        (accumulator, publisher, index) => {
          return {
            ids: {...accumulator.ids, [publisher]: index },
            data: [...accumulator.data, { name: publisher }]
          }
        }, {
          ids: {},
          data: []
        }
      );

      publishersToStore.data.push({ name: 'Unknown Publisher' });

      return resolve(publishersToStore);
    }

    const prepareDataToStore = Promise.all([
      new Promise(getAllAuthorsFromData),
      // new Promise(getAllContentTypesFromData),
      // new Promise(getAllPublishersFromData)
    ]);

    // const [authors, contentTypes, publishers] = await prepareDataToStore;
    const [authors] = await prepareDataToStore;

    const storeData = Promise.all([
      AuthorsController.store(authors.data),
      // ContentTypesController.store(contentTypes.data),
      // PublishersController.store(publishers.data)
    ]);

    await storeData;

    // const collections = data.map(exemplary => {
    //   const {
    //     titulo: title,
    //     sub_titulo: subtitle,
    //     assunto: subject,
    //     autor: author,
    //     tipo_material: content_type,
    //     quantidade: amount,
    //     ano: year,
    //     edicao: edition,
    //     editora: publisher,
    //     isbn,
    //     issn
    //   } = exemplary;

    //   return {
    //     title: title.trim(),
    //     subtitle: subtitle.trim(),
    //     subject: subject.trim(),
    //     author_id: authors.ids[author] ? authors.ids[author] : authors.ids.length + 1,
    //     content_type_id: contentTypes.ids[content_type]
    //       ? contentTypes.ids[content_type]
    //       : contentTypes.ids.length + 1,
    //     amount: amount ? amount : 0,
    //     year: year.trim(),
    //     edition: edition.trim(),
    //     publisher_id: publishers.ids[publisher]
    //       ? publishers.ids[publisher]
    //       : publishers.ids.length + 1,
    //     isbn: isbn.trim(),
    //     issn: issn.trim()
    //   }
    // });

    // const storedCollections = await Exemplary.bulkCreate(collections);

    // return storedCollections;
  }
};
