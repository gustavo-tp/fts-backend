const { QueryTypes } = require('sequelize');

const Exemplary = require('../models/Exemplary');

module.exports = {
  async index(request, response) {
    const { seachTerms, page = 1 } = request.query;

    if (!seachTerms) {
      return response.status(400).json({
        status: 'error',
        message: 'Invalid Search Terms',
      });
    }

    const offset = (+page > 0) ? (+page - 1) * 10 : 0;

    const searchQuery = seachTerms.split(' ').join(' & ');
    
    const queryStartDate = new Date().getTime();

    const result = await Exemplary.sequelize.query(`
      WITH cte AS (
        SELECT
          title,
          subtitle,
          author,
          content_type,
          edition,
          publisher
        FROM search_index
        WHERE 
          document @@ to_tsquery('pt', '${searchQuery}')
        ORDER BY
          ts_rank(document, to_tsquery('pt', '${searchQuery}')) DESC
      )
      SELECT *
      FROM (
        TABLE cte
        OFFSET ${offset} LIMIT 10
      ) sq
      RIGHT JOIN (
        SELECT COUNT(1) AS full_count
        FROM cte
      ) sq2 ON true;
    `,
    {
      type: QueryTypes.SELECT,
      benchmark: true,
      logging: console.log,
    });

    const queryFinishDate = new Date().getTime();

    const queryExecutionTime = queryFinishDate - queryStartDate;

    const totalRows = result[0].full_count;
    const data = totalRows > 0
      ? result.map(row => {
          delete row.full_count;
          return row;
        })
      : [];

    return response.json({
      data,
      totalPages: Math.ceil(totalRows / 10),
      totalRecords: totalRows,
      queryExecutionTime,
    });
  }
}