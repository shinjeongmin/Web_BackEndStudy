const express = require("express");
const router = express.Router(); // api요청을 인지하고 어떤것을 처리할지 결정하는 라이브러리
const path = require("path"); // node 내부 lib 파일 경로를 가져오기 편함

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../index.html")); // __dirname 현재 파일 경로
});

// 모듈로써 내보내는 코드
module.exports = router;