// services/tasksService.js
const repo = require('../repositories/tasksRepository');

const getAllTasks = async () => repo.findAll();

const getTaskById = async (id) => {
  const task = await repo.findById(id);
  if (!task) throw { status: 404, message: `Task with id ${id} not found` };
  return task;
};

const createTask = async (data) => {
  if (!data.title || data.title.trim() === '')
    throw { status: 400, message: 'Title is required' };
  if (data.title.length > 255)
    throw { status: 400, message: 'Title must be 255 characters or fewer' };
  return await repo.create(data);
};

const updateTask = async (id, data) => {
  await getTaskById(id);
  if (data.title !== undefined && data.title.trim() === '')
    throw { status: 400, message: 'Title cannot be empty' };
  return await repo.update(id, data);
};

const deleteTask = async (id) => {
  await getTaskById(id);
  return await repo.remove(id);
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
