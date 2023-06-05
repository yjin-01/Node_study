import dns from "dns/promises";

const ip = await dns.lookup("gilbut.co.kr"); // top level await
console.log("IP", ip);

const a = await dns.resolve("gilbut.co.kr", "A"); // ip 주소(ipv4)
console.log("A", a);

// const aaaa = await dns.resolve("gilbut.co.kr", "AAAA"); // ip 주소(ipv6)
// console.log("AAAs", aaaa);

const ns = await dns.resolve("gilbut.co.kr", "NS"); // 네임 서버
console.log("NS", ns);

const mx = await dns.resolve("gilbut.co.kr", "MX"); // 메일 서버
console.log("MX", mx);

const cname = await dns.resolve("www.gilbut.co.kr", "CNAME"); // 별칭(주로 www가 붙은 주소는 별칭)
console.log("CNAME", cname);

const any = await dns.resolve("gilbut.co.kr", "ANY"); // 기타 나머지 설정
console.log("ANY", any);

// SOA: 도메인 정보
