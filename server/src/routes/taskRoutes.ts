import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/", deleteTask);
router.patch("/:taskId/status", updateTaskStatus);
export default router;
