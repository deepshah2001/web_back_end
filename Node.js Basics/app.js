// Requiring http from global reference
const http = require("http");

// Importing routes from local reference (Method 1 - If only there is one export from that desired file.)
//(Method 2, 3, 4 - If there is more than one export from that desired file.)
const routes = require('./routes');

// Importing will be same but accessing will be different for 2, 3 and 4 as compared to 1

// Definded port number = 4000 for server on localhost
const portNumber = 4000;

// Creating server and passing routes function which is imported from method 1
const server = http.createServer(routes);

// Creating server and passing routes function which is imported from method 2, 3, 4
// const server = http.createServer(routes.handler);
// console.log(routes.secondHandler);

// Starting the server at port 4000 (which is declared on top) and on localhost.
server.listen(portNumber, "localhost", () =>
  console.log(`Server started at http://localhost:${portNumber}`)
);