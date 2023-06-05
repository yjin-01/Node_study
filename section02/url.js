// const url = require("url");

// const { URL } = url;

const myUrl = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);

console.log("searchParams:", myUrl.searchParams); // URLSearchParams 조회
console.log("searchParams.getAll():", myUrl.searchParams.getAll("category")); // 해당 key의 모든 value 조회
console.log("searchParams.get():", myUrl.searchParams.get("limit")); // 해당 key의 value 조회
console.log("searchParams.has():", myUrl.searchParams.has("page")); // key 유무 확인

console.log("searchParams.keys():", myUrl.searchParams.keys()); // keys 조회
console.log("searchParams.values():", myUrl.searchParams.values()); // values 조회

myUrl.searchParams.append("filter", "es3"); // key & value 추가
myUrl.searchParams.append("filter", "es5");
console.log(myUrl.searchParams.getAll("filter"));

myUrl.searchParams.set("filter", "es6"); // value 수정
console.log(myUrl.searchParams.getAll("filter"));

myUrl.searchParams.delete("filter"); // 삭제
console.log(myUrl.searchParams.getAll("filter"));

console.log("searchParams.toString():", myUrl.searchParams.toString());
myUrl.search = myUrl.searchParams.toString(); // 객체를 문자열로 변환후 search에 할당
