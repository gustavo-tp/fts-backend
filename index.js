const fs = require('fs');
const csv = require('csv-parser');
const path = require('path')

require('./src/database');

// const ExemplariesController = require('./src/controllers/ExemplariesController');
const AuthorsController = require('./src/controllers/AuthorsController');
const PublishersController = require('./src/controllers/PublishersController');

const { readJsonFile } = require('./src/utils/jsonManipulator');

const ExemplaresAcervoController = require('./src/controllers/ExemplaresAcervoController')

//readCsvAndWriteJson('exemplares-acervo.csv');
const exemplaresAcervo = readJsonFile(
  path.resolve(__dirname, 'exemplares-acervo-fetch.json')
);

ExemplaresAcervoController.store(exemplaresAcervo.result.records).then(console.log);

// ExemplariesController.store(exemplaresAcervo);
// const authors = getDistinctAuthorsFromExemplaresAcervo(exemplaresAcervo);
// const publishers = getDistinctPublishersFromExemplaresAcervo(exemplaresAcervo);

// storeAllAuthor(authors).then(console.log);
// storeAllPublishers(publishers).then(console.log);

function readCsvAndWriteJson(filePath) {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', row => results.push(row))
    .on('end', () => {
      console.log('CSV file successfully processed');
      const data = JSON.stringify(results);
      fs.writeFileSync('exemplares-acervo.json', data);
    });
}

function getDistinctAuthorsFromExemplaresAcervo(exemplaresAcervo) {
  const authors = exemplaresAcervo.map(exemplar => exemplar.autor);

  const distinctAuthors = authors.filter(
    (author, index) => author && index === authors.indexOf(author)
  );

  return distinctAuthors;
}

function getDistinctPublishersFromExemplaresAcervo(exemplaresAcervo) {
  const publishers = exemplaresAcervo.map(exemplar => exemplar.editora);

  const distinctPublishers = publishers.filter(
    (publisher, index) => publisher && index === publishers.indexOf(publisher)
  );

  return distinctPublishers;
}

async function storeAllAuthor(authors) {
  const authorsToStore = authors.map(author => ({ name: author }));

  await AuthorsController.store(authorsToStore);
}

async function storeAllPublishers(publishers) {
  const publishersToStore = publishers.map(publisher => ({ name: author }));

  await PublishersController.store(publishersToStore);
}
