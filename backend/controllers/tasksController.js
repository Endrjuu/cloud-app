const express = require('express');
const router = express.Router();
const service = require('../services/tasksService');

router.get('/', async (req, res) => {
  try {
    const tasks = await service.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await service.getTaskById(Number(req.params.id));
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await service.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await service.updateTask(Number(req.params.id), req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const task = await service.updateTask(Number(req.params.id), req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await service.deleteTask(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
