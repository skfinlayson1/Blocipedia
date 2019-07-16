const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

function normalizePort(port) {
    parsedPort = parseInt(port, 10);

    if (isNaN(parsedPort)) {
        return port;
    } else if (parsedPort >= 0) {
        return parsedPort;
    } else {
        return false;
    }
};

server.listen(port);
server.on("listening", () => {
    console.log("Server is listening on Port: " + server.address().port);
})