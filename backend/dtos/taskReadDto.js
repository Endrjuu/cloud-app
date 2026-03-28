// dtos/taskReadDto.js
// DTO = kontrakt API – ukrywa wewnętrzne pola bazy danych (np. created_at)
// Frontend nigdy nie widzi surowej encji z bazy

class TaskReadDto {
  constructor({ id, title, completed }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    // celowo pomijamy: created_at i inne pola systemowe bazy
  }
}

module.exports = TaskReadDto;
