const { createBareServer } = require("@tomphttp/bare-server-node");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");

const { join } = require("path");
const express = require("express");
const path = require("path");

const bare = createBareServer("/bare/");

const app = express();
const port = 3000;

const publicDir = path.join(__dirname, "public");

app.use("/uv/", express.static(uvPath));

app.use("/", express.static(publicDir));

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(publicDir, "404.html"));
});

app.on("request", (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

app.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

app.listen(port, () => {
    console.log(`Termite is listening on port: ${port}`);
});

