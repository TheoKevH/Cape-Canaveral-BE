const Board = require('../models/Board');

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

module.exports = {
    createBoard,
    getBoards,
    getBoardById,
    deleteBoard
}