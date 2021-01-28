const fs = require('fs');
const csv = require('csv-parser');

function readCsv(filePath) {
  const fileContent = fs.readFileSync(filePath);

  const parsedFile = csv(fileContent, { separator: ';' })

  return parsedFile;
}

module.exports = { readCsv }