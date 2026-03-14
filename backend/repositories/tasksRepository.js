// repositories/tasksRepository.js
const { pool } = require('../db');

const findAll = async () => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
  return result.rows;
};

const findById = async (id) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const create = async ({ title, completed }) => {
  const result = await pool.query(
    'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
    [title, completed ?? false]
  );
  return result.rows[0];
};

const update = async (id, { title, completed }) => {
  const result = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($1, title),
         completed = COALESCE($2, completed)
     WHERE id = $3 RETURNING *`,
    [title ?? null, completed ?? null, id]
  );
  return result.rows[0] || null;
};

const remove = async (id) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return result.rowCount > 0;
};

module.exports = { findAll, findById, create, update, remove };
