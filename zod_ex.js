import {z} from "zod";

function zodLog(schema, value) {
  try {
    const result = schema.parse(value);
    console.log("✅ 성공:", result);
    
  } catch (error) {
    console.log("❌ 에러:", error, "| 입력값:", value);
  }
}

