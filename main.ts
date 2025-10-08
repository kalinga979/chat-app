import express from "express";
import type { NextFunction, Request, Response } from "express";
import { startDb } from "./models/mongo.ts";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3001;

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect to Mongo DB
try {
  await startDb();
} catch (err) {
  console.error(err);
  console.log("Failed to connect to mongodb, Stopping server!");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//This is to enable no caching mechanism , remove this when in production.
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/register", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});
import userRouter from "./routes/userRoutes.ts";
app.use("/user", userRouter);
