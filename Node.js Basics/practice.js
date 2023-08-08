// Handling routes like "/", "/home", "/about", "/node"
if(url === '/') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Server</title></head>');
    res.write('<body><h1>Hello from my first Node.js Server!</h1></body>');
    res.write('</html>');
    return res.end();
} else if(url === '/home') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Server</title></head>');
    res.write('<body><h1>Welcome home</h1></body>');
    res.write('</html>');
    return res.end();
} else if(url === '/about') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Server</title></head>');
    res.write('<body><h1>Welcome to About Us page</h1></body>');
    res.write('</html>');
    return res.end();
} else if(url === '/node') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Server</title></head>');
    res.write('<body><h1>Welcome to my Node Js Project</h1></body>');
    res.write('</html>');
    return res.end();
} else {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Server</title></head>');
    res.write('<body><h1>Enter Valid URL</h1></body>');
    res.write('</html>');
    return res.end();
}
