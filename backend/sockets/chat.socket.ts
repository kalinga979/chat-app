import { Server, Socket } from "socket.io";
// import {chatConroller} from
export function chatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // socket.on("chat message", (msg) => {
    //   // chatController.handleMessage(io, socket, msg);
    // });
    //
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
