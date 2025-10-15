const post = {
  id: 1,
  title: "비구조화 연습",
  author: {
    id: 99,
    name: "Alice"
  },
  comments: [
    { id: 10, text: "좋은 글이네요!" },
    { id: 11, text: "잘 읽었습니다." }
  ]
};

//아래 객체에서 비구조화 할당을 이용해 title, comments 배열의 첫 번째 원소, 그리고 author.name 값을 꺼내보세요.
const {title, comments:[comment], author:{name}} = post;
console.log(title, comment.id, comment.text, name)