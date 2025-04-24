const Column = require('../models/Column');

const createColumn = async (req, res) => {
  const { name } = req.body;
  const boardId = req.params.boardId;

  try {
    const column = await Column.create({ name, board: boardId });
    res.status(201).json(column);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create column' });
  }
};

const getColumnsByBoard = async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const columns = await Column.find({ board: boardId });
    res.status(200).json(columns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch columns' });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const column = await Column.findByIdAndDelete(req.params.id);
    if (!column) return res.status(404).json({ message: 'Column not found' });

    res.status(200).json({ message: 'Column deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete column' });
  }
};

module.exports = {
    createColumn,
    getColumnsByBoard,
    deleteColumn
}
