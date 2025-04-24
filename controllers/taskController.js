const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const columnId = req.params.columnId;

  try {
    const task = await Task.create({ title, description, column: columnId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const getTasksByColumn = async (req, res) => {
  const columnId = req.params.columnId;

  try {
    const tasks = await Task.find({ column: columnId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body, // { title, description, column }
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
    createTask,
    getTasksByColumn,
    updateTask,
    deleteTask
}
