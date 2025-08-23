import express from "express";
import type { NextFunction, Request, Response } from "express";
import { startDb } from "./models/mongo.ts";
import { createServer } from "node:http";
// import { Server } from "socket.io";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

// These lines replicate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });
const port = process.env.PORT || 3000;

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);
//
//   socket.on('chat message', (msg) => {
//     // Broadcast to all other clients
//     socket.broadcast.emit('chat message', msg);
//     console.log(msg)
//   });
//
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

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
app.post("/register", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send({ status: "ok" });
});
