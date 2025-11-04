import { Router, Response, Request } from "express";
import {
  getAllTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
} from "../database/db";
import { CreateTodoRequest, DeleteTodoResponse } from "../../../types/todo";
import { error } from "console";

const router = Router();

// Todo一覧取得
router.get("/", (req: Request, res: Response) => {
  try {
    const todos = getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Cannot load todos" });
  }
});

// Todo新規作成
router.post("/", (req: Request, res: Response) => {
  try {
    const { title }: CreateTodoRequest = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTodo = createTodo(title.trim());

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Todo削除
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const todo = getTodoById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    deleteTodo(id);

    const response: DeleteTodoResponse = {
      message: "Todo deleted successfully",
    };

    res.json(response);
  } catch (error) {
    console.error("Error deleting Todo:", error);
    res.status(500).json({ error: "Unable to delete todo" });
  }
});

// Todo更新
router.patch("/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { isCompleted } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({ error: "isCompleted must be s boolean" });
    }

    const updatedTodo = updateTodo(id, isCompleted);

    if (!updateTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Unable to update todo" });
  }
});

export default router;
