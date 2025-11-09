import { Server } from "socket.io";

let io;

export const setupWebSocket = (server) => {
  io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const emitEvent = (eventName, data) => {
  if (io) io.emit(eventName, data);
};
