import { Server, Socket } from "socket.io";

// Define expected events from client
interface ClientToServerEvents {
  register: (userId: string) => void;
  private_message: (payload: { to: string; message: string }) => void;
}

// Define expected events to send back to client
interface ServerToClientEvents {
  private_message: (payload: { from: string; message: string }) => void;
  user_offline: (payload: { to: string }) => void;
}

type MySocket = Socket<ClientToServerEvents, ServerToClientEvents>;

const users = new Map<string, string>(); // userId -> socket.id

export default function setupSocket(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
) {
  io.on("connection", (socket: MySocket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId: string) => {
      users.set(userId, socket.id);
      console.log(`User registered: ${userId}`);
    });

    socket.on("private_message", ({ to, message }) => {
      const from = [...users.entries()].find(([, sid]) => sid === socket.id)
        ?.[0];
      if (!from) return;

      const targetSocketId = users.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("private_message", { from, message });
      } else {
        socket.emit("user_offline", { to });
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of users.entries()) {
        if (sockId === socket.id) {
          users.delete(userId);
          console.log(`User disconnected: ${userId}`);
          break;
        }
      }
    });
  });
}
