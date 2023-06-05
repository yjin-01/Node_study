const { odd, even } = require("./var");
const check = require("./func");

function check2(value) {
  if (value) {
    console.log(odd, even);
    return "성공";
  }
}

console.log(check(4));
console.log(check2(1));
