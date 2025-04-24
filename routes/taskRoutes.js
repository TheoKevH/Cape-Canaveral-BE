const express = require('express');
const router = express.Router();
const { createTask, getTasksByColumn, updateTask, deleteTask } = require('../controllers/taskController');
const requireAuth = require('../middleware/authMiddleware');

router.use(requireAuth);

router.post('/:columnId', createTask);           
router.get('/:columnId', getTasksByColumn);      
router.put('/:id', updateTask);                  
router.delete('/:id', deleteTask);               

module.exports = router;
