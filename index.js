import { WebSocket, WebSocketServer } from "ws";
import { createServer } from "http";

const server = createServer();
server.listen(8888, () => {
  console.log("im up");
});

const wss = new WebSocketServer({ server: server });

wss.on("connection", (socket, req) => {
  socket.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client != socket && client.readyState == WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});
