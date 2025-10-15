const nums = [1, 3, 5, 7];

console.log(nums.some( (n) => (n%2===0) ))
console.log(nums.some( n => n > 4))

const users = [
  {id:'id1', pw:'1234'},
  {id:'id2', pw:'4567'}
]

const inputId = 'id1';
const inputPw = '1234';
// const isValid = users.some((u)=> u.id===inputId && u.pw===inputPw)
const isValid = users.some( ({id, pw}) => (id===inputId && pw===inputPw))
console.log(isValid)

const nums2 = [2, 4, 6, 8]
console.log(nums2.some( n=>(n%2===1)))

const members = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 26 },
];
console.log(members.some( ({age}) => (age>=25)))