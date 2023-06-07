const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  // 메인 스레드
  // 워커 스레드에 일 분배 & 결과물 통합 역할
  // const worker = new Worker(__filename);
  // const worker1 = new Worker(__filename);
  // const worker2 = new Worker(__filename);

  const threads = new Set(); // 중복되지 않는 배열
  threads.add(
    new Worker(__filename, {
      workerData: { start: 1 },
    })
  );
  threads.add(
    new Worker(__filename, {
      workerData: { start: 2 },
    })
  );

  for (let worker of threads) {
    worker.on("message", (value) => {
      console.log("워커로부터", value);
    }); // 이벤트는 워커에 최대한 가깝게..?
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log("워커 끝!");
      }
    });
  }
} else {
  // 워커 스레드
  // parentPort.on("message", (value) => {
  const data = workerData;
  console.log(data);
  parentPort.postMessage(data.start + 100);
  // parentPort.close(); // 워커스레드의 역할이 끝나면 종료
  // });
}
