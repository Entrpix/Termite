const { createBareServer } = require('@tomphttp/bare-server-node');
const express = require('express');
const path = require('path');

const bareServer = createBareServer('/bare/');
const app = express();

const port = 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    };
});

app.use((req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    };
});
 
app.listen(port, () => {
    console.log(`Termite listening on port: ${port}`);
});