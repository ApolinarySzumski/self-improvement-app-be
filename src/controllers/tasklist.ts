import { Request, Response } from "express";
import pool from "../db.ts";
import { Task } from "../types/Task.ts";
import createdAt from "../utils/createDate.ts";
import errorHandler from "../utils/errorHandler.ts";
import taskMapper from "../utils/taskMapper.ts";

// GET
export const getTasks = async (_: unknown, res: Response) => {
  try {
    const fetchTasksFromDB: Task[] = (
      await pool.query("SELECT * FROM tasklist ORDER BY tasklist_id")
    ).rows;
    const tasks = fetchTasksFromDB.map((t) => taskMapper(t));

    if (!tasks) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(tasks);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorHandler(e) });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await pool.query(
      "SELECT * FROM tasklist WHERE tasklist_id = $1",
      [id],
    );

    if (!task.rows[0]) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(taskMapper(task.rows[0]));
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorHandler(e) });
  }
};

// POST
export const createTask = async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasklist (task, created_at) VALUES($1,$2) RETURNING *",
      [task, createdAt],
    );

    res.status(201).json(newTask.rows[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorHandler(e) });
  }
};

// PATCH
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    await pool.query(
      "UPDATE tasklist SET task = $1, updated_at = $2 WHERE tasklist_id = $3",
      [task, createdAt, id],
    );

    res.status(200).json({
      message: "Task was updated",
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorHandler(e) });
  }
};

export const changeTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { is_done } = req.body;

  try {
    await pool.query(
      "UPDATE tasklist SET is_done = $1 WHERE tasklist_id = $2",
      [is_done, id],
    );

    res.status(200).json({ message: "Task status was updated" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorHandler(e) });
  }
};

// DELETE
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await pool.query(
      "SELECT * FROM tasklist WHERE tasklist_id = $1",
      [id],
    );

    if (!task.rows[0]) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    await pool.query("DELETE FROM tasklist WHERE tasklist_id = $1", [id]);

    res.status(200).json({ message: `Task with id: ${id} was deleted` });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorHandler(e) });
  }
};

export const deleteAllTasks = async (_: unknown, res: Response) => {
  try {
    await pool.query("DELETE FROM tasklist");
    res.status(200).json({ message: "All tasks were deleted" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorHandler(e) });
  }
};
