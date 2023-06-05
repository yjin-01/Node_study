const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
  // randomBytes() 메서드로 64바이트 길이의 문자열 생성 === salt
  const salt = buf.toString("base64");
  console.log("salt:", salt);
  // pbkdf2() 메서드에는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘
  crypto.pbkdf2("비밀번호", salt, 100000, 64, "sha512", (err, key) => {
    // 10만번 반복
    console.log("password:", key.toString("base64"));
  });
});
