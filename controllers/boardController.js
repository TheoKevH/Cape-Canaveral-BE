const Board = require('../models/Board');
const Column = require('../models/Column');
const Task = require('../models/Task');

const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      user: req.user.userId
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create board' });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.userId });
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, user: req.user.userId });
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get board' });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.status(200).json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete board' });
  }
};

const getFullBoard = async (req, res) => {
    const boardId = req.params.id;
  
    try {
      // Make sure the board belongs to the logged-in user
      const board = await Board.findOne({ _id: boardId, user: req.user.userId });
      if (!board) return res.status(404).json({ message: 'Board not found' });
  
      const columns = await Column.find({ board: board._id });
  
      // For each column, get its tasks
      const columnsWithTasks = await Promise.all(columns.map(async (column) => {
        const tasks = await Task.find({ column: column._id });
        return {
          _id: column._id,
          name: column.name,
          tasks
        };
      }));
  
      res.status(200).json({
        _id: board._id,
        name: board.name,
        columns: columnsWithTasks
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch full board' });
    }
};

module.exports = {
    createBoard,
    getBoards,
    getBoardById,
    deleteBoard,
    getFullBoard
}