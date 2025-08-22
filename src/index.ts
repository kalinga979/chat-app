
import express from 'express';
import type { Request, Response } from 'express';
import { startDb } from './models/mongo.ts';
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

// These lines replicate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const port = process.env.PORT || 3000;


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat message', (msg) => {
    // Broadcast to all other clients
    socket.broadcast.emit('chat message', msg);
    console.log(msg)
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`)
});


// Connect to Mongo DB
try {
  await startDb();
} catch (err) {
  console.error(err);
  console.log("Failed to connect to mongodb, Stopping server!")
  process.exit(1)
}


app.use((_req: Request, res: Response, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

