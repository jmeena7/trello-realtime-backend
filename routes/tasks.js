import express from "express";
import { createTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.put("/:cardId", updateTask);
router.delete("/:cardId", deleteTask);

export default router; // ✅ default export
