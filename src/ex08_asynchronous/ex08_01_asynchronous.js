// console.log("1. 시작");

// setTimeout( ()=>{
//   console.log("2. 2초 후 실행")
// }, 2000)

// console.log("3. 끝")

// function sayHello(name, callback){
//   console.log("안녕, "+ name);
//   callback();
// }

// sayHello("철수", ()=>{
//   console.log("잘 지내자!");
// })

// console.log("1. 주문 시작");

// setTimeout(() => {
//   console.log("2. 음식 준비 완료 (3초)");
//   console.log("3. 주문 끝");
// }, 3000);

// setTimeout(() => {
//   console.log("1단계 완료");
//   setTimeout(() => {
//     console.log("2단계 완료");
//     setTimeout(() => {
//       console.log("3단계 완료");
//       setTimeout(() => {
//         console.log("4단계 완료");
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const myPromise = new Promise( (resolve, reject) => {
//   setTimeout(()=>{
//     // resolve("작업 성공!");
//     reject("작업 실패")
//   })
// })

// myPromise.then( (result) => {
//   console.log(("결과:", result))
// }).catch( (error)=> {
//   console.log("에러: ", error)
// })

function step(msg) {
  return new Promise( (resolve) => {
    setTimeout( ()=> {
      console.log(msg);
      resolve();
    }, 1000);
  })
}
// step("1단계 완료")
//   .then(()=> step("2단계 완료"))
//   .then(()=> step("3단계 완료"))
//   .catch((err)=> console.log("에러:", err))



// step2("앗! 1단계 성공")
//   .then(()=>step2("아! 2단계"))
//   .then(()=>step2("오 3단계"))
//   .catch( (err) => console.log("에러: "+err));

function waitOneSec() {
  return new Promise( (resolve) => {
    setTimeout( ()=> resolve("1초 후 완료"), 1000)
  })
}

async function run() {
  console.log("시작");
  const result = await waitOneSec();
  console.log(result);
  console.log("끝!")
}

// run()

function step2(msg, time=1000) {
  return new Promise( (resolve, reject) => {
    setTimeout( ()=> {
      if (msg.startsWith("오")) {
        console.log(msg);
        resolve(msg);
      } else {
        reject("실패 '" + msg + "'는 '오'로 시작하지 않음")
      }
    }, time)
  })
}

async function processStep() {
  try {
    await step2("아! 1단계");
    await step2("오! 2단계");
    await step2("아! 3단계");
    await step2("오! 4단계");
  } catch (err) {
    console.log("에러: " + err);
  } finally {
    console.log("finally는 에러 여부와 상관없이 실행")
  }
}

// processStep()

async function processAll() {
  try {
    await Promise.all([
      step2("오! 1단계", 1000),
      step2("아! 2단계", 2000),
      step2("오! 3단계", 1000),
    ]);
    console.log("모든 단계 성공")
  } catch (err) {
    console.log("에러: " + err);
  } finally {
    console.log("processAll 종류")
  }
}

// processAll()

async function processAllSettled() {
  const res = await Promise.allSettled([
    step2("오! 1단계", 1000),
    step2("아! 2단계", 2000),
    step2("오! 3단계", 1000),
  ]);
  res.forEach((r,i) => {
    if (r.status === "fulfilled") {
      console.log(`${i+1}단계: 성공 (value=${r.value})` );
      console.log(`${i+1}단계: 성공 (reason=${r.reson})` );
    } else {
      console.log(`${i+1}단계: value (value=${r.value})`);
      console.log(`${i+1}단계: 실패 (reason=${r.reason})`);
    }
  })
  console.log("모든 단계 종료 (부분 성공 허용)");
}
// processAllSettled();

async function processAny() {
  try {
    const result = await Promise.any([
      step2("오! 1단계", 1000),
      step2("아! 2단계", 500),
      step2("오! 3단계", 500),
    ])
    console.log("가장 먼저 성공한 결과: "+ result)
  } catch (err) {
    console.log("any 에러 - 모두 실패: " + err)
  } finally {
    console.log("processAny 종료")
  }
}

// processAny()

async function processRace() {
  try {
    const winner = await Promise.race([
      step2("오! 1단계", 1000),
      step2("아! 2단계", 1000),
      step2("오! 3단계", 500),
    ])
    console.log("가장 먼전 끝난 결과: " + winner);
  } catch(err) {
    console.log("race 에러:", err);
  } finally {
    console.log("processRace 종료");
  }
}

processRace()