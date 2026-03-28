const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'studyplanner-db-98721.postgres.database.azure.com',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'studyplanner',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Student.002!',
  ssl: { rejectUnauthorized: false },
});

module.exports = { pool };