const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory "database"
let tasks = [];
let idCounter = 1;

// Routes

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = { id: idCounter++, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Delete task by id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: `Task ${id} deleted` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
