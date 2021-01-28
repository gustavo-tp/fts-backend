const ExemplaresAcervo = require('../models/ExemplaresAcervo');

module.exports = {
  async store(data) {
    const exemplaresAcervo = await ExemplaresAcervo.bulkCreate(data);

    return exemplaresAcervo;
  }
};
