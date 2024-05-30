import express from 'express';
import { Task, ExecutionLog } from '../models';
import { scheduleTask, executeTask } from '../utils/taskScheduler';

const router = express.Router();

router.post('/', async (req, res) => {
  const { type, time, cron } = req.body;
  const task = new Task({ type, time, cron });
  await task.save();
  scheduleTask(task);
  res.json({ id: task.id, message: 'Task registered successfully' });
});

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await Task.findByIdAndUpdate(id, updates, { new: true });
  res.json({ message: 'Task updated successfully' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted successfully' });
});

router.get('/logs', async (req, res) => {
  const logs = await ExecutionLog.find();
  res.json(logs);
});

export default router;
