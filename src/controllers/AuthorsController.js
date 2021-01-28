const Author = require('../models/Author');

module.exports = {
  async store(data) {
    const authors = await Author.bulkCreate(data);

    return authors;
  }
};
