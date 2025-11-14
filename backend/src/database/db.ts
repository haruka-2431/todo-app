import Database from "better-sqlite3";
import path from "path";
import { Todo } from "../../../types/todo";

const dbPath = path.join(__dirname, "../../database.sqllite");
const db = new Database(dbPath);

console.log("Connected to SQLite database");

// 初期化
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  isCompleted INTEGER DEFAULT 0)`);

console.log("Todos table ready");

interface TodoRow {
  id: number;
  title: string;
  isCompleted: number;
}

// TODO一覧取得
export function getAllTodos(): Todo[] {
  const rows = db
    .prepare("SELECT * FROM todos ORDER BY id DESC")
    .all() as TodoRow[];
  return rows.map(row => ({
    id: row.id,
    title: row.title,
    isCompleted: row.isCompleted === 1
  }));
}

// TODO作成
export function createTodo(title: string): Todo {
  const statement = db.prepare(
    "INSERT INTO todos (title, isCompleted) VALUES (?, ?)"
  );
  const result = statement.run(title, 0);

  return {
    id: result.lastInsertRowid as number,
    title,
    isCompleted: false,
  };
}

// TODO単体取得
export function getTodoById(id: number): Todo | undefined {
  const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
  if (!row) return undefined;

  return {
    id: row.id,
    title: row.title,
    isCompleted: row.isCompleted === 1,
  };
}

// TODO削除
export function deleteTodo(id: number): boolean {
  const result = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  return result.changes > 0;
}

// TODO更新
export function updateTodo(id: number, isCompleted: boolean): Todo | null {
  const result = db.prepare('UPDATE todos SET isCompleted = ? WHERE id = ?').run(isCompleted ? 1 : 0, id);

  if (result.changes === 0)
    return null;

  return getTodoById(id) || null;
}