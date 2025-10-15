const fruits1 = ["apple", "banana"];
const fruits2 = ["orange", "grape"];

const user = { name: "Tom", age: 20, company: "Naver" };
const job = { title: "Developer", company: "Google" };

const settings = { theme: "light", fontSize: 14, language: "ko" };

const fruits = [...fruits1, ...fruits2];

console.log(fruits)

const person = {...job, ...user}

console.log(person)

const settings2 = {...settings, fontSize: 20}

console.log(settings2)