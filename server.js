const http = require('http');

let server = http.createServer((req, res) => {
  let ip = req.headers['x-forwarded-for'].split(',')[0];
  let language = req.headers['accept-language'].split(';')[0].split(',')[0];
  let os = req.headers['user-agent'].split('(')[1].split(')')[0];
  
  let result = { ip: ip, language: language, os: os };

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(JSON.stringify(result));
}).on('error', (err) => { console.log(err); throw err; });

let listener = server.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});