require('dotenv').config()

const Server = require("./modules/server.module");
const server = new Server()

server.listen()
