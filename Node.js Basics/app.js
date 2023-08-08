// Requiring http and fs
const http = require("http");
const fs = require("fs");

// Definded port number = 4000 for server on localhost
const portNumber = 4000;

// Creating server with 2 arguments request and response
const server = http.createServer((req, res) => {
  const url = req.url; // For taking out url
  const method = req.method; // For taking out the method of the network call

  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");

    res.write("<head><title>File Handling</title></head>");
    res.write("<body>");

    // Reading from the file
    fs.readFile("message.txt", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.write("<p>" + data + "</p>");
      }

      res.write(
        '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
      );
      res.write("</html>");
      return res.end();
    });
  } else if (url === "/message" && method === "POST") {
    const body = [];
    // Handling chunks of data which is parsed
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      // Created buffer for parsing data chunks which are completely so that not waiting for the stream to be fully completed
      const parsedBody = Buffer.concat(body).toString();

      //   For retrieving the message which user is writing in the form (key=value)
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        // If the redirects are valid
        res.statusCode = 302;
        // Redirecting to the "/" page
        res.setHeader("Location", "/");
        res.end();
      });
    });
    // If directing to any other routes or invalid path
  } else {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>File Handling</title></head>");
    res.write("<body><h1>Enter Valid URL</h1></body>");
    res.write("</html>");
    return res.end();
  }
});

// Starting the server at port 4000 (which is declared on top) and on localhost.
server.listen(portNumber, "localhost", () =>
  console.log(`Server started at http://localhost:${portNumber}`)
);

// Handling routes like "/", "/home", "/about", "/node"
// if(url === '/') {
//     res.setHeader('Content-type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Server</title></head>');
//     res.write('<body><h1>Hello from my first Node.js Server!</h1></body>');
//     res.write('</html>');
//     return res.end();
// } else if(url === '/home') {
//     res.setHeader('Content-type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Server</title></head>');
//     res.write('<body><h1>Welcome home</h1></body>');
//     res.write('</html>');
//     return res.end();
// } else if(url === '/about') {
//     res.setHeader('Content-type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Server</title></head>');
//     res.write('<body><h1>Welcome to About Us page</h1></body>');
//     res.write('</html>');
//     return res.end();
// } else if(url === '/node') {
//     res.setHeader('Content-type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Server</title></head>');
//     res.write('<body><h1>Welcome to my Node Js Project</h1></body>');
//     res.write('</html>');
//     return res.end();
// } else {
//     res.setHeader('Content-type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>My First Server</title></head>');
//     res.write('<body><h1>Enter Valid URL</h1></body>');
//     res.write('</html>');
//     return res.end();
// }
