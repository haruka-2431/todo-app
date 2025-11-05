import express, { Express, Request, Response } from "express";
import cors from "cors";
import todoRoutes from "./routes/todos";

const app: Express = express();
const POST = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ルート
app.use("/api/todos", todoRoutes);

// ヘルスチェック
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Todo API is running" });
});

// サーバー起動
app.listen(POST, () => {
  console.log(`Sever is running on http://localhost:${POST}`);
  
})