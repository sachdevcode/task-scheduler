import { createClient } from 'redis';
import { executeTask } from './taskScheduler';

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 12508
    }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

export const queueTask = (task:any) => {
  redisClient.lPush('taskQueue', JSON.stringify(task));
};

const processQueue = async () => {
  const taskString = await redisClient.rPop('taskQueue');
  if (taskString) {
    const task = JSON.parse(taskString);
    executeTask(task);
  }
};

setInterval(processQueue, 1000);
