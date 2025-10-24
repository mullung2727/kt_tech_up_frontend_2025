import {email, z} from "zod";

function zodLog(schema, value) {
  try {
    const result = schema.parse(value);
    console.log("✅ 성공:", result);
    
  } catch (error) {
    console.log("❌ 에러:", error, "| \n입력값:", value);
  }
}

const nameScham = z.string("문자열 이어야 해")

// zodLog(nameScham, "abc")
// zodLog(nameScham, 123)
// zodLog(nameScham, ['123'])

const passwordSchema = z.string("문자열").min(3, "최소길이는 3 입니다").max(5,"최대길이는 5 입니다.")

// zodLog(passwordSchema, 123)

const userSchema = z.object({
  name: z.string("obj: name은 문자열이어야 합니다."),
  age: z.number("obj: age는 숫자여야 합니다.")
})

// zodLog(userSchema, {name:"jane", age:15})

// *- 연습문제 1 — 도서 등록 object schema 만들기
// *- `title`: 문자열, 최소 2자, 최대 20자
// *- `publishYear`: 숫자, 1900 이상, 2025 이하

const bookSchema = z.object({
  title: z.string().min(2, "최소길이 2글자").max(20, "최대길이 30글자"),
  publishYear: z.number().min(1900).max(2025)
})

// zodLog(bookSchema, {title:"클린코드", publishYear:2013})

// const signUpSchema = z.object({
//   pw: z.string(),
//   pwconfirm: z.string()
// }).refine((d)=>(d.pw === d.pwconfirm), {
//   message:"비밀번호 불일치",
//   path:['pwconfirm']
// })

// zodLog(signUpSchema, {pw:"123", pwconfirm:"1234"})

const emailSchema = z.email("이메일 형식이 아닙니다.")
// zodLog(emailSchema, "a!@bc@abc")


const signUpSchema = z.object({
  email: z.email("이메일 형식이 아닙니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
                      .regex(/[!@#$%^&*]/, "특수문자를 포함해야 합니다.")
                      .regex(/[0-9]/, "숫자를 포함해야 합니다.")
                      .regex(/[a-zA-Z]/, "영문자를 포함해야 합니다."),
  passwordConfirm: z.string()
}).refine((data)=>data.password===data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"]
});

// zodLog(signUpSchema, {
//   email: "test@test.com",
//   password: "test123!",
//   passwordConfirm: "test123!"
// })

// zodLog(signUpSchema, {
//   email: "test!!@test.com",
//   password: "test123",
//   passwordConfirm: "test123!"
// })


// *- 연습문제 2 - 상품 등록
// *- `productName`: 문자열, 3~10자
// *- `price`: 숫자, 0 이상
// *- `stock`: 숫자, 0 이상
// *- `seller_email`: 이메일
// *- **추가 조건**: `price >= 30000` 이면 `stock >= 1`
// *    - 위반 시 에러 경로는 `stock`

const productSchema = z.object({
  productName: z.string().min(3, "3글자 이상").max(10, "10글자 이하"),
  price: z.number().min(0, "가격은 0 이상"),
  stock: z.number().min(0, "재고는 0 이상"),
  seller_email: z.email("이메일 형식이 아닙니다.")
}).refine((data) => {
  if( data.price >= 30000) {
    return data.stock >= 1;
  } else {
    return true
  }
}, {
  message: "가격이 30000원 이상이면 재고가 1 이상이어야 합니다.",
  path: ['stock']
})

zodLog(productSchema, {
  productName: "만연필",
  price: 40000,
  stock: 0,
  seller_email: "seller@sell.com"
})