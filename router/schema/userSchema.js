const mongoose = require("mongoose");

// 통신 할 때 스키마 규격 (RDB에서의 attribute와 비슷)
const userSchema = mongoose.Schema({
    id: "string",
    pw: "string",
})

module.exports = mongoose.model("userSchema", userSchema); // mongoose 전용 export 형태