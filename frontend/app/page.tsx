"use client";

import { useState, useEffect } from "react";
import { Todo } from "../../types/todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  // バックエンドからのTodoを取得
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/todos`);

      if (!response.ok) {
        throw new Error("Todoの取得に失敗しました");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error("エラー:", err);
      setError("Todoの読み込みに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodoTitle }),
      });

      if (!response.ok) {
        throw new Error("Todoの追加に失敗しました");
      }

      setNewTodoTitle("");
      fetchTodos();
    } catch (err) {
      console.error("エラー:", err);
      setError("Todoの追加に失敗しました");
    }
  };

  // Todo削除
  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Todoの削除に失敗しました");
      }

      fetchTodos();
    } catch (err) {
      console.error("エラー:", err);
      setError("Todoの削除に失敗しました");
    }
  };

  const handleToggleTodo = async (id: number, isCompleted: boolean) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });
      
      if (!response.ok) {
        throw new Error("Todoの更新に失敗しました");
      }
      
      fetchTodos();
      
    } catch (err) {
      console.error("エラー:", err);
      setError("Todoの更新に失敗しました");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">Todo App</h1>

        {/* Todo追加フォーム */}
        <form onSubmit={handleAddTodo} className="mb-6">
          <div className="join w-full">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="新しいTodoを入力..."
              className="input input-bordered join-item flex-1"
            />
            <button type="submit" className="btn btn-primary join-item">
              追加
            </button>
          </div>
        </form>

        {/* Todo一覧カード */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* ローディング表示 */}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <>
                {/* 未完了セクション */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">
                    📝 未完了
                  </h2>
                  <ul className="space-y-2">
                    {todos
                      .filter((todo) => !todo.isCompleted)
                      .map((todo) => (
                        <li
                          key={todo.id}
                          className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() =>
                              handleToggleTodo(todo.id, todo.isCompleted)
                            }
                            className="checkbox checkbox-primary"
                          />
                          <span className="flex-1">{todo.title}</span>
                          <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="btn btn-ghost btn-sm btn-error"
                          >
                            削除
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* 区切り線 */}
                <div className="divider"></div>

                {/* 完了セクション */}
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-gray-500">
                    ✅ 完了
                  </h2>
                  <ul className="space-y-2">
                    {todos
                      .filter((todo) => todo.isCompleted)
                      .map((todo) => (
                        <li
                          key={todo.id}
                          className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() =>
                              handleToggleTodo(todo.id, todo.isCompleted)
                            }
                            className="checkbox checkbox-primary"
                          />
                          <span className="flex-1 line-through opacity-50">
                            {todo.title}
                          </span>
                          <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="btn btn-ghost btn-sm btn-error"
                          >
                            削除
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
