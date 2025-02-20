import { WebSocket, WebSocketServer } from "ws";
import { createServer } from "http";
import 'dotenv/config';
import {factGiver} from "./factUtils.js";
import express from 'express';

const server = createServer();
server.listen(8888, () => {
  console.log("im up");
});

const wss = new WebSocketServer({ server: server });

const app = express();
const port = 9900;

app.get('/', async (req, res) => {
  res.send(await factGiver());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

wss.on("connection", (socket, req) => {
  socket.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client != socket && client.readyState == WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

