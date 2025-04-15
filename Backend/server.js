const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket'); // import the initializer

const port = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
  