// controllers/tasksController.js
// Warstwa HTTP – obsługuje żądania i zwraca wyłącznie obiekty DTO

const express = require('express');
const router = express.Router();
const service = require('../services/tasksService');

// GET /api/tasks – lista zadań (zwraca DTO[])
router.get('/', async (req, res) => {
  try {
    const tasks = await service.getAllTasks();
    // tasks to już lista TaskReadDto – bez pól systemowych bazy
    res.status(200).json(tasks);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// GET /api/tasks/:id – szczegóły (zwraca TaskReadDto)
router.get('/:id', async (req, res) => {
  try {
    const task = await service.getTaskById(Number(req.params.id));
    // task to TaskReadDto – nie zawiera created_at ani innych pól wewnętrznych
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// POST /api/tasks – dodaj zadanie (zwraca TaskReadDto)
router.post('/', async (req, res) => {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PUT /api/tasks/:id – pełna aktualizacja
router.put('/:id', async (req, res) => {
  try {
    const task = await service.updateTask(Number(req.params.id), req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PATCH /api/tasks/:id – częściowa aktualizacja (np. tylko completed)
router.patch('/:id', async (req, res) => {
  try {
    const task = await service.updateTask(Number(req.params.id), req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id – usuń zadanie
router.delete('/:id', async (req, res) => {
  try {
    await service.deleteTask(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
