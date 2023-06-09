const EventEmitter = require("events");

const myEvent = new EventEmitter();

myEvent.addListener("event1", () => {
  console.log("이벤트 1");
});
myEvent.on("event2", () => {
  console.log("이벤트 2");
});
myEvent.on("event2", () => {
  console.log("이벤트 2 추가");
});
myEvent.once("event3", () => {
  console.log("이벤트 3");
}); // 한 번만 실행됨

myEvent.emit("event1"); // 이벤트 호출
myEvent.emit("event2"); // 이벤트 호출

myEvent.emit("event3");
myEvent.emit("event3"); // 실행 안 됨

myEvent.on("event4", () => {
  console.log("이벤트 4");
});
myEvent.removeAllListeners("event4"); // 연결된 모든 콜백함수 제거
myEvent.emit("event4"); // 실행 안 됨

const listener = () => {
  console.log("이벤트 5");
};
myEvent.on("event5", listener);
myEvent.removeListener("event5", listener); // 지우고 싶은 콜백함수만 제거 가능
myEvent.emit("event5"); // 실행 안 됨

console.log(myEvent.listenerCount("event2"));

// 웹 소켓에서 활용 가능
