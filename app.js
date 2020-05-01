const http = require('http');
const path = require('path');
const fs = require('fs');
const ProgressBar = require('progress');

const hostname = '127.0.0.1';
const port = process.env.port || 3000;

const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100);

const server = http.createServer((req, res) => {
  // Build Path
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Extension of file
  let extName = path.extname(filePath);

  // Initial content type
  let contentType = 'text/html';

  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  if (contentType == "text/html" && extName == "") filePath += ".html";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', 'notFound.html'),
          (err, content) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(content, 'utf8');
          });
      } else {
        res.statusCode(500);
        res.end(`Server error: ${err.code}`)
      }
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(content, 'utf8');
    }
  })

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});