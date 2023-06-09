const crypto = require("crypto");

const pass = "pass";
const salt = "salt";
const start = new Date();

crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("1", new Date() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("2", new Date() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("3", new Date() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("4", new Date() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("5", new Date() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("6", new Date() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("7", new Date() - start);
});

crypto.pbkdf2(pass, salt, 1_000_000, 128, "sha512", () => {
  console.log("8", new Date() - start);
});
