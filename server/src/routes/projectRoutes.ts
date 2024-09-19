import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
} from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.get("/projectId/:projectId", getProjectById);
router.post("/", createProject);
router.delete("/", deleteProject);
export default router;
