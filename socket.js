const SI = require('socket.io');

module.exports = server => {
  const io = SI(server, { path: '/socket.io' });

  io.on('connection', socket => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속 ! ', ip, socket.id, req.ip);

    socket.on('disconnect', () => {
      console.log('클라이언트 접속해제 , ', ip, socket.id);
      clearInterval(socket.interval);
    });

    socket.on('error', e => {
      console.error(e);
    });

    socket.on('reply', data => {
      console.log(data);
    });
    socket.on('message', data => {
      console.log(data);
    });

    socket.interval = setInterval(() => {
      socket.emit('news', '안녕 나는 소켓 서버다!!!');
    }, 3000);
  });
};
