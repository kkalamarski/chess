import express from "express";
import http from "http";
import io from "socket.io";
import path from "path";
import game from "./server/game";

const app = express();
const server = http.createServer(app);
const socket = new io.Server(server);

socket.on("connection", game);

app.use("/public", express.static("dist"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "dist/index.html"))
);

server.listen(3000, () =>
  console.log(`Server listnening at http://localhost:3000`)
);
