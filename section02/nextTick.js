// setImmediate(() => {
//   console.log("immediate");
// });

// process.nextTick(() => {
//   console.log("nextTick");
// });

// setTimeout(() => {
//   console.log("timeout");
// }, 0);

// Promise.resolve().then(() => {
//   for (let i = 0; i < 100000; i++) {
//     if (i === 9999) console.log("???");
//   }
//   console.log("promise1");
// });
// Promise.resolve().then(() => {
//   for (let i = 0; i < 10000; i++) {
//     if (i === 999) console.log("???");
//   }
//   console.log("promise2");
// });
setImmediate(() => {
  let winner;
  console.log("in poll phase, the winner is");
  queueMicrotask(() => {
    if (!winner) console.log((winner = "microtask"));
  });
  process.nextTick(() => {
    if (!winner) console.log((winner = "nextTick"));
  });
});
