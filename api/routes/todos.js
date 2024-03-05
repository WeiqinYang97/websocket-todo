import express from "express";
import { addTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo.js";

const router = express.Router();
router.get("/:id", getTodo);
router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;