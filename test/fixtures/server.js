const serveHandler = require('serve-handler');
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
  return serveHandler(request, response, {
    public: path.resolve(__dirname, './files'),
    headers: [
      {
        source: '*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ]
  });
})

server.listen(14000, () => {
  console.log('Running at http://localhost:14000');
});
