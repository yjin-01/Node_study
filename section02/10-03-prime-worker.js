const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

if (isMainThread) {
  const max = 10000000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.floor((max - min) / threadCount);
  let start = min;
  console.time("prime");
  // worker_thread 8개 생산(일을 직접 분배해주어야함)
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(
      new Worker(__filename, { workerData: { start: wStart, range } })
    );
    start += range;
  }
  threads.add(
    new Worker(__filename, { workerData: { start, range: max - start } })
  );

  for (let worker of threads) {
    // worker에서 에러난 경우 어떻게 할 것인가
    worker.on("error", (err) => {
      throw err;
    });
    // worker들이 작업이 끝나면 어떻게 할 것인가
    worker.on("exit", () => {
      threads.delete(worker); // worker_thread 끝날때마다 삭제
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primes.length);
      }
    });
    // worker들이 작업한 내용을 어떻게 해줄 것인가
    worker.on("message", (msg) => {
      // 각각의 workere들이 구한 소수들 합쳐주기
      primes = primes.concat(msg);
    });
  }
} else {
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
