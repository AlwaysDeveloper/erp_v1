const io = require('socket.io');

class IO {
  constructor(server) {
    this.serverSocket = io(server);
    this.setIOEvents();
  }

  setIOEvents() {
    this.serverSocket.on('connection', socket => {
      socket.on('confirm-connection', id => {
        console.log(id);
        socket.emit('coonected', { status: true });
      });
    });
  }
}

module.exports = IO;
