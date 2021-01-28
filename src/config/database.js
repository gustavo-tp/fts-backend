module.exports = process.env.DATABASE_URL || {
  dialect: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  define: {
    underscored: true,
    timestamps: false
  }
};

