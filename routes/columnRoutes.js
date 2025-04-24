const express = require('express');
const router = express.Router();
const { createColumn, getColumnsByBoard, deleteColumn } = require('../controllers/columnController');
const requireAuth = require('../middleware/authMiddleware');

router.use(requireAuth);

router.post('/:boardId', createColumn); // Create column in a board
router.get('/:boardId', getColumnsByBoard); // Get all columns in a board
router.delete('/:id', deleteColumn); // Delete a column

module.exports = router;