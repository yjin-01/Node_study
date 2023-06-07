const buffer = Buffer.from("버퍼로 변경해 주세요");
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];
const buffer2 = Buffer.concat(array);
console.log("concat():", buffer2.toString());

// 빈 buffer 생성
const buffer3 = Buffer.alloc(5);
console.log("alloc():", buffer3);
