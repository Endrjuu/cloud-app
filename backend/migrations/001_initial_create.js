// migrations/001_initial_create.js
// Migracja nr 1 – inicjalna struktura bazy danych
// Node.js odpowiednik "dotnet ef migrations add InitialCreate"
// Uruchom: node migrations/001_initial_create.js

const { pool } = require('../db');

async function up() {
  console.log('Running migration: 001_initial_create...');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations_history (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // Sprawdź czy migracja była już wykonana
  const check = await pool.query(
    "SELECT id FROM migrations_history WHERE name = '001_initial_create'"
  );
  if (check.rows.length > 0) {
    console.log('Migration 001_initial_create already applied. Skipping.');
    return;
  }

  // Utwórz tabelę tasks
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // Zapisz historię migracji
  await pool.query(
    "INSERT INTO migrations_history (name) VALUES ('001_initial_create')"
  );

  console.log('Migration 001_initial_create applied successfully.');
}

up()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Migration failed:', err.message);
    process.exit(1);
  });
