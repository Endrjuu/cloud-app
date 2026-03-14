// models/task.js
// Represents the Task entity in the database

class Task {
  constructor({ id, title, description, status, due_date, created_at }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueDate = due_date;
    this.createdAt = created_at;
  }
}

module.exports = Task;
