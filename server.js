const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request body as JSON
app.use(express.json());

// Sample tasks data
let tasks = [];

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.json(newTask);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.sendStatus(204);
});

// Update task completion status
app.patch('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    res.json(task);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
