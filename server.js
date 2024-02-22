import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { createServer } from "node:http";
import { hostname } from "node:os";
import express from "express";

const bare = createBareServer("/bare/");

const server = createServer();
const app = express();

const publicPath = "public";
const port = 8000;

app.use("/uv/", express.static(uvPath));
app.use(express.static(publicPath));

app.use((req, res) => {
  res.status(404);
  res.send(`<h1>404 | Try Again</h1>`);
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
  const address = server.address();

  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

server.listen({
  port,
});