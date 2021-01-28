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

    const searchQuery = [
      'title',
      'subtitle',
      'author',
      'content_type',
      'edition',
      'publisher',
    ].map(column =>
      `(${column} ILIKE '%${seachTerms.split(' ').join(`%' AND ${column} ILIKE '%`)}%')`
    ).join(' OR ');

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
        FROM exemplaries_view
        WHERE ${searchQuery}
      )
      SELECT *
      FROM (
        TABLE cte
        ORDER BY
          title,
          subtitle,
          author,
          edition,
          publisher,
          content_type
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