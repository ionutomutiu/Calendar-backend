import express from 'express';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json());

const adapter = new JSONFile("tasks.json")
const db = new Low(adapter, { tasks: [] })

await db.read()


app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/tasks', async (req, res) => {
    await db.read();
    res.json(db.data.tasks);
});

app.post('/task', async (req, res) => {
    const task = req.body;
    db.data.tasks.push(task);
    await db.write();
    res.status(201).json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    await db.read();
    const taskIndex = db.data.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    db.data.tasks.splice(taskIndex, 1);
    await db.write();
    res.status(204).end();
});


app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
