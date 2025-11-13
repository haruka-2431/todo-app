"use client";

import { useState } from "react";

export default function Home() {

  const [todos, setTodos] = useState ([
    { id:1, title: "買い物", isCompleted: false },
    { id:2, title: "掃除", isCompleted: false },
    { id:2, title: "勉強", isCompleted: true }
  ]);

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">
          Todo App
        </h1>
        
        {/* Todo一覧カード */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            
            {/* 未完了セクション */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                📝 未完了
              </h2>
              <ul className="space-y-2">
                { todos.filter( todo => !todo.isCompleted ).map((todo) => (
                <li key = {todo.id} className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary" 
                  />
                  <span className="flex-1">{todo.title}</span>
                  <button className="btn btn-ghost btn-sm btn-error">
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
                { todos.filter(todo => todo.isCompleted).map((todo) => (
                <li key = {todo.id} className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary" 
                    checked
                  />
                  <span className="flex-1 line-through opacity-50">{todo.title}</span>
                  <button className="btn btn-ghost btn-sm btn-error">
                    削除
                  </button>
                </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
