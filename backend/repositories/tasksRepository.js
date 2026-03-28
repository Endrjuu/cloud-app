// repositories/tasksRepository.js
// Bezpośredni dostęp do bazy danych – mapowanie na DTO

const { pool } = require('../db');
const TaskReadDto = require('../dtos/taskReadDto');

// GetAll – zwraca listę DTO zamiast surowych encji
const findAll = async () => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
  return result.rows.map(row => new TaskReadDto(row)); // mapowanie na DTO
};

// GetById – zwraca DTO zamiast czystej encji
const findById = async (id) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  if (!result.rows[0]) return null;
  return new TaskReadDto(result.rows[0]); // mapowanie na DTO
};

const create = async ({ title, completed }) => {
  const result = await pool.query(
    'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
    [title, completed ?? false]
  );
  return new TaskReadDto(result.rows[0]); // DTO po zapisie
};

const update = async (id, { title, completed }) => {
  const result = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($1, title),
         completed = COALESCE($2, completed)
     WHERE id = $3 RETURNING *`,
    [title ?? null, completed ?? null, id]
  );
  if (!result.rows[0]) return null;
  return new TaskReadDto(result.rows[0]); // DTO po aktualizacji
};

const remove = async (id) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return result.rowCount > 0;
};

module.exports = { findAll, findById, create, update, remove };
