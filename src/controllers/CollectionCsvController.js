const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const ExemplariesController = require('./ExemplariesController');

module.exports = {
  store(req, res) {
    const { filename } = req.file;

    const collection = [];

    fs.createReadStream(
      path.resolve(__dirname, '..', '..', 'uploads', filename)
    )
      .pipe(csv({ separator: ';' }))
      .on('data', row => collection.push(row))
      .on('end', async () => {
        console.log('CSV file successfully processed');
        const result = await ExemplariesController.store(collection);
        res.json({ message: `Inserted ${result.length} exemplaries.` });
      });
  }
};
