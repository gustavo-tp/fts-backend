const Publisher = require('../models/Publisher');

module.exports = {
  async store(data) {
    const publishers = await Publisher.bulkCreate(data);

    return publishers;
  }
};
