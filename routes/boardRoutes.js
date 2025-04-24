const express = require('express');
const router = express.Router();
const { createBoard, getBoards, getBoardById, deleteBoard } = require('../controllers/boardController');
const requireAuth = require('../middleware/authMiddleware');
const { getFullBoard } = require('../controllers/boardController'); 

router.use(requireAuth); // all routes below require auth

router.post('/', createBoard);
router.get('/', getBoards);
router.get('/:id', getBoardById);
router.delete('/:id', deleteBoard);
router.get('/full/:id', getFullBoard); 

module.exports = router;
