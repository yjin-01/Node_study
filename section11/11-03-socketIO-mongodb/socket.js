const SocketIO = require("socket.io");
const { removeRoom } = require("./services");

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: "/socket.io" });
  // io객체 express에 저장(나중에 router에서 socket.io사용하기위해)
  app.set("io", io);
  // io == / 기본 네임스페이스
  // 다른  네임스페이스로 구별가능
  const room = io.of("/room");
  const chat = io.of("/chat");

  // wrap 함수
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next); // req, res, next 형태 만들어주기

  chat.use(wrap(sessionMiddleware));

  room.on("connection", (socket) => {
    console.log("room 네임스페이스 접속");

    // close 와 같은 역할
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스 접속");

    // 특정 방으로 연결가능하게 함
    socket.on("join", (data) => {
      socket.join(data); // 방 참가
      socket.to(data).emit("join", {
        user: "system",
        chat: `${socket.request.session.color}님이 입장하셨습니다.`,
      });

      // socket.leave(data); // 방 나가기
    });
    // close 와 같은 역할
    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");
      // /room/방아이디?비밀번호
      const { referer } = socket.request.headers; // 주소 가져오기
      const roomId = new URL(referer).pathname.split("/").at(-1);

      const currentRoom = chat.adapter.rooms.get(roomId);
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
        await removeRoom(roomId);
        room.emit("removeRoon", roomId);
        console.log("방 제거 성공");
      } else {
        //참가자가 있는 경우에만 메시지 전송
        socket.to(roomId).emit("join", {
          user: "system",
          chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};

// '키 - 값'으로 통신
