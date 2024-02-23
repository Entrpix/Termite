import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { dynamicPath } from "@nebula-services/dynamic";
import { createServer } from "node:http";
import express from "express";

const bare = createBareServer("/bare/");

const server = createServer();
const app = express();

const publicPath = "public";
const port = 8000;

app.use("/dynamic/", express.static(dynamicPath));
app.use("/uv/", express.static(uvPath));

app.use(express.static(publicPath));

app.use((req, res) => {
  res.status(404);
  res.sendFile(`${publicPath}/404.html`, { root: '.' });
});
server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Listening on Port: ${port}`);
});

server.listen({
  port,
});