const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.json());
let tasks = [];
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
app.post('/tasks', (req, res) => {
    console.log(req.body);
    const task = {
        id: tasks.length + 1,
        text: req.body.text,
        added: new Date().toLocaleString(),
        completed: null
    };
    tasks.push(task);
    res.status(201).json(task);
});
app.post('/tasks/:id/complete', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = new Date().toLocaleString();
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
