import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join } from "path";
import { existsSync } from 'fs';
import express from "express";

if (!existsSync(new URL('./dist', import.meta.url))) await import(new URL('./esbuild.prod.js', import.meta.url));

const bare = createBareServer("/bare/");
const app = express();
const port = 3000;

const publicPath = new URL('./public', import.meta.url);
const distPath = new URL('./dist', import.meta.url);

app.use(express.static(publicPath.pathname));
app.use("/dynamic/", express.static(distPath.pathname));
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
  res.sendFile(join(publicPath.pathname, "404.html"));
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});