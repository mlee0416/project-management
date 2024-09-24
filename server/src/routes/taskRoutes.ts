import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:taskId", deleteTask);
router.patch("/:taskId/status", updateTaskStatus);
router.patch("/:taskId", updateTask);

export default router;
