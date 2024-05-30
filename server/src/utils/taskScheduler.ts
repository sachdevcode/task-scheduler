import { Task, ExecutionLog } from '../models';
import { scheduleJob } from 'node-schedule';
import { queueTask } from './taskQueue';

export const scheduleTask = (task:any) => {
  if (task.type === 'one-time') {
    scheduleJob(task.time, () => queueTask(task));
  } else if (task.type === 'recurring') {
    scheduleJob(task.cron, () => queueTask(task));
  }
};

export const executeTask = async (task:any) => {
  try {
    // Simulate task execution
    const log = new ExecutionLog({
      taskId: task._id,
      executionTime: new Date(),
      status: 'success',
      message: 'Task executed successfully'
    });
    await log.save();
    task.status = 'executed';
    await log.save();
  } catch (error:any) {
    const log = new ExecutionLog({
      taskId: task._id,
      executionTime: new Date(),
      status: 'failure',
      message: error?.message
    });
    await log.save();
    task.status = 'failed';
    await log.save();
  }
};
