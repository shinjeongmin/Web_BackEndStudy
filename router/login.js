const express = require("express");
const router = express.Router(); 
const path = require("path");
const cookieParser = require('cookie-parser');
const dao = require('./DAO/select');

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../login.html")); // __dirname 현재 파일 경로
});

router.post("/", (req, response) => {
    const reqId = req.body.id;
    const reqPassword = req.body.pw;

    const result = {
        "success" : false,
        "description" : "",
    };

    dao.selectFromUserDB(reqId)
    .then(res => {
        console.log(res.rows);

        if (res.rows.length == 0) {
            result.description = "일치하는 id가 존재하지 않습니다";
        }
        else {
            // check pass word
            if (res.rows[0].pw == reqPassword) {
                result.success = true;
            }
            else {
                result.description = "비밀번호가 잘못되었습니다";
            }
        }
        response.send(result);
    })
    .catch(e => {
        // select error
        result.description = "정보 입력에 오류가 발생했습니다";
        response.send(result);
    });
});

router.post("/hasCookie", (req,response) => {
    const reqId = req.body.id;

    const result = {
        "success" : false,
        "description" : "",
    };

    dao.selectFromUserDB(reqId)
    .then(res => {
        if (res.rows.length == 0) {
            result.description = "일치하는 id가 존재하지 않습니다";
        }
        else {
            result.success = true;
        }
        response.send(result);
    })
    .catch(e => {
        // select error
        result.description = "정보 입력에 오류가 발생했습니다";
        response.send(result);
    });
});

module.exports = router;

// body parser를 이용할 때는 object명이 반드시 body이어야 함
// const body = {
//     "id" : "stageus",
//     "pw" : "1234"
// };