import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join } from "node:path";

const publicPath = "public";
const bare = createBareServer("/bare/");
const app = express();

app.use(express.static(publicPath));
app.use("/uv/", express.static(uvPath));

app.use((req, res, next) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    next();
  }
});

app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});