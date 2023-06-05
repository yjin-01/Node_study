console.log(this); // 전역 스코프의 this만 module.exports
console.log(((this === module.exports) === {}) === exports); // true

function a() {
  console.log(this === global); //func안의 this는 global
}

a(); // true
