const http = require('http');
const portNumber = 4000;

const server = http.createServer((req, res) => {
    console.log("Deep Shah");
});

server.listen(portNumber, 'localhost', () => 
    console.log(`Server started at http://localhost:${portNumber}`));