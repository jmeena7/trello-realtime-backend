import express from "express";
import { createBoard } from "../controllers/boardController.js";

const router = express.Router();

router.post("/", createBoard);

export default router;  // ✅ default export
