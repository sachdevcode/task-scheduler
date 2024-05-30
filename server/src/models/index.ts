import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  type: { type: String, required: true },
  time: { type: Date, required: false },
  cron: { type: String, required: false },
  status: { type: String, default: "scheduled" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Task = model("Task", taskSchema);

const executionLogSchema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  executionTime: { type: Date, required: true },
  status: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ExecutionLog = model("ExecutionLog", executionLogSchema);
