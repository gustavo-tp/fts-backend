const ContentType = require('../models/ContentType');

module.exports = {
  async store(data) {
    const contentTypes = await ContentType.bulkCreate(data);

    return contentTypes;
  }
};
