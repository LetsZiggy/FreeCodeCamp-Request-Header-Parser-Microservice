const http = require('http');
const fs = require('fs');

let html = null;
let css = null;

fs.readFile('./www/index.html', (err, data) => {
  if(err) { console.log(err); throw err; }
  else {
    html = data;
  }
});

fs.readFile('./www/style.css', (err, data) => {
  if(err) { console.log(err); throw err; }
  else {
    css = data;
  }
});

let server = http.createServer((req, res) => {
  req.url = req.url.slice(1);
  if(req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
  else if(req.url.includes('style.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(css);
  }
  else if(req.url.includes('favicon.ico')) {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end('https://cdn.glitch.com/fd0945e1-6530-4d57-9bbe-86a45fc996e5%2Fblog_logo.ico?1515388595365');
  }
  else {
    let ip = req.headers['x-forwarded-for'].split(',')[0];
    let language = req.headers['accept-language'].split(';')[0].split(',')[0];
    let os = req.headers['user-agent'].split('(')[1].split(')')[0];

    let result = { ip: ip, language: language, os: os };

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(result));
  }
}).on('error', (err) => { console.log(err); throw err; });

let listener = server.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});