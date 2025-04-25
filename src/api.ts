import express from "express";
import { createTask, deleteAllTasks, deleteTask, getTask, getTasks, updateTask } from "./controllers/tasklist.ts";

const router = express.Router();

router.post("/tasklist", createTask);
router.get("/tasklist", getTasks);
router.get("/tasklist/:id", getTask);
router.patch("/tasklist/:id", updateTask);
router.delete("/tasklist/:id", deleteTask);
router.delete("/tasklist", deleteAllTasks);

export default router;