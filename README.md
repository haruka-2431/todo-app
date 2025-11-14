# Todo App

フルスタックTodoアプリケーション

## 技術スタック

### バックエンド
- Node.js
- Express.js
- TypeScript
- SQLite3 (better-sqlite3)

### フロントエンド
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- DaisyUI

## 機能

- ✅ Todoの追加
- ✅ Todoの削除
- ✅ Todoの完了/未完了の切り替え
- ✅ 未完了/完了でセクション分け
- ✅ ローディング表示
- ✅ エラーハンドリング

## 環境構築

### 必要な環境

- Node.js (v18以上推奨)
- npm

### インストール手順

1. リポジトリをクローン

\`\`\`bash
git clone <あなたのリポジトリURL>
cd todo-app
\`\`\`

2. バックエンドのセットアップ

\`\`\`bash
cd backend
npm install
\`\`\`

3. フロントエンドのセットアップ

\`\`\`bash
cd ../frontend
npm install
\`\`\`

## ローカルでの起動方法

### 1. バックエンドを起動

\`\`\`bash
cd backend
npm run dev
\`\`\`

**起動確認**:
\`\`\`
Server is running on http://localhost:3001
\`\`\`

### 2. フロントエンドを起動（別のターミナル）

\`\`\`bash
cd frontend
npm run dev
\`\`\`

**起動確認**:
\`\`\`
▲ Next.js 15.x.x
- Local: http://localhost:3000
\`\`\`

### 3. ブラウザでアクセス

\`\`\`
http://localhost:3000
\`\`\`

## プロジェクト構造

\`\`\`
todo-app/
├── backend/              # バックエンド
│   ├── src/
│   │   ├── database/     # データベース関連
│   │   ├── routes/       # APIルート
│   │   └── index.ts      # エントリーポイント
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # フロントエンド
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # メインページ
│   │   └── globals.css   # グローバルスタイル
│   ├── package.json
│   └── tsconfig.json
├── types/                # 共通型定義
│   └── todo.ts
└── README.md
\`\`\`

## API エンドポイント

### GET /api/todos
全てのTodoを取得

### POST /api/todos
新しいTodoを作成

**リクエストボディ**:
\`\`\`json
{
  "title": "買い物"
}
\`\`\`

### PATCH /api/todos/:id
Todoの完了状態を更新

**リクエストボディ**:
\`\`\`json
{
  "isCompleted": true
}
\`\`\`

### DELETE /api/todos/:id
Todoを削除

## トラブルシューティング

### ポートが既に使用されている

**バックエンド (3001)** または **フロントエンド (3000)** のポートが使用中の場合:

\`\`\`bash
# macOS/Linux
lsof -ti:3001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
\`\`\`

### データベースのリセット

\`\`\`bash
cd backend
rm database.db
npm run dev
\`\`\`

データベースファイルが自動的に再作成されます。

## 開発者

磯部晴香

## ライセンス

MIT
