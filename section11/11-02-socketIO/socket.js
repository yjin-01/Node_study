const SocketIO = require("socket.io");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  // 처음 연결 시
  io.on("connection", (socket) => {
    // 클라이언트 조회
    const req = socket.request; // req
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress; //ip 추출

    // socket.io는 연결할 때마다 id부여 => id를 통해 특정인에게 메세지 전송 가능
    console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);

    // close 와 같은 역할
    socket.on("disconnect", () => {
      console.log("클라이언트 접속 해제", ip, socket.id);
      clearInterval(socket.interval);
    });

    // 받을 때
    socket.on("reply", (data) => {
      // 주고 받을 때 이벤트의 이름을 줄 수 있음
      console.log(data);
    });

    socket.on("error", console.error);

    socket.interval = setInterval(() => {
      socket.emit("news", "Hello socket.io"); // 보낼때 브라우저에서 socket.on('news')
    }, 3000);
  });
};

// '키 - 값'으로 통신
