const fs = require('fs');

function readJsonFile(filePath) {
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);
  
  return jsonData;
}

function writeJson(path, data) {
  const stringData = JSON.stringify(data);

  console.log(path)

  fs.writeFileSync(path, stringData);
}

module.exports = { readJsonFile, writeJson };