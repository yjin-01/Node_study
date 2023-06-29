const Websocket = require("ws");

module.exports = (server) => {
  const wss = new Websocket.Server({ server });

  // 처음 연결 시
  wss.on("connection", (ws, req) => {
    // 클라이언트 조회
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress; //ip 추출

    console.log("새로운 클라이언트 접속", ip);

    // 받을 때
    ws.on("message", (message) => {
      console.log(message.toString()); // 버퍼형태로 전달되기 때문에 toString()필요
    });

    ws.on("error", console.error);
    ws.on("close", () => {
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN)
        ws.send("서버에서 클라이언트로 메시지를 보냅니다."); // 보낼때
    }, 3000);
  });
};
