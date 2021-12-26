const express = require("express");
const router = express.Router(); 
const path = require("path");
const dao = require('./DAO/dao');

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../createaccount.html"));
});

router.post("/", (req, response) => {
    const reqId = req.body.id;
    const reqPassword = req.body.pw;
    const reqName = req.body.name;
    const reqPhoneNum = req.body.phoneNum;
    const reqAddress = req.body.address;

    const result = {
        "success" : false,
        "description" : "",
    };

    dao.selectFromUserDB(reqId)
        .then(res => {
            if (res.rows.length == 0) {
                dao.insertIntoUserDB(reqId, reqPassword, reqName, reqPhoneNum, reqAddress)
                    .then((err, res) => {
                        // insert success
                        result.success = true;
                        response.send(result);
                    })
                    .catch((err) => {
                        // insert error
                        console.log("error code : " + err.code + " -- insert value violates constraint error");
                        result.description = "전화번호 형식을 010-0000-0000의 형태로 입력하세요";
                        response.send(result);
                    });
            }
            else {
                // already exist id
                result.description = "이미 존재하는 id입니다";
                response.send(result);
            }
        })
        .catch(e => {
            // select error
            console.log(e);
            result.description = "정보 입력에 오류가 발생했습니다";
            response.send(result);
        });

    ///
});

module.exports = router;