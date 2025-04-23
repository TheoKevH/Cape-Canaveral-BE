const express = require('express');
const router = express.Router();
const { createBoard, getBoards, getBoardById, deleteBoard } = require('../controllers/boardController');
const requireAuth = require('../middleware/authMiddleware');

router.use(requireAuth); // all routes below require auth

router.post('/', createBoard);
router.get('/', getBoards);
router.get('/:id', getBoardById);
router.delete('/:id', deleteBoard);

module.exports = router;
