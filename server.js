const express = require("express");
const server = express();
const EventEmiiter = require("events");
const emitter = new EventEmiiter();
const fs = require("fs");
const os = require("os");
const path = require("path");
const Logger = require("./logger");
const logger = new Logger();
const hostname = "127.0.0.1";
const port = 3000;

//Basic routes
server.get("/", (request, response) => {
  response.send("Example Node Home Page");
});

server.post("/login", (req, res) => {
  if (!req.header("x-auth-token")) {
    return res.status(400).send("No Token");
  }

  if (req.header("x-auth-token") !== "12345") {
    return res.status(401).send("Unauthorized");
  }

  res.send("Logged in.");
});

server.get("/about", (request, response) => {
  response.send("About Page");
});

server.get("/health", (request, response) => {
  let health = {
    status: "UP"
  };
  response.end(JSON.stringify(health));
});

server.get("/env", (request, response) => {
  const nodeEnv = process.env.NODE_ENV;
  const totalMemory = `${os.totalmem() / (1024 * 1024)}mb`;
  const freeMemory = `${Math.round(os.freemem() / (1024 * 1024))}mb`;
  const env = {
    systemEnvironment: {
      environment: nodeEnv,
      totalMemory: totalMemory,
      freeMemory: freeMemory
    }
  };
  response.end(JSON.stringify(env));
});

//Testing node modules
const pathObj = path.parse(__filename);
console.log("Testing path module: ", pathObj);

//async version of readdir, takes a callback func
fs.readdir("./", (err, files) => {
  if (err) console.log("Error", err);
  else console.log("readdir: ", files);
});

//Register a listener on emitter
emitter.on("logging", eArg => {
  console.log("logging listener called", eArg);
});

//Register a listener on my logger class
logger.on("messageLogged", eventArg => {
  console.log("messageLogged listener called", eventArg);
});

//Calling emit
emitter.emit("logging", { id: 1, message: "job started" });

//Calling log function on logger class
logger.log("My message!");

//Express error handling middleware
server.use((request, response) => {
  response.type("text/plain");
  response.status(505);
  response.send("Error Page");
});

//Binding to a port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
