const { odd, even } = require("./var");

function check(number) {
  if (number % 2 === 0) {
    return even;
  } else {
    return odd;
  }
}

check(4);

module.exports = check;
