const express = require("express");
const router = express.Router(); 
const path = require("path");
const client = require("./connectClient_pg");

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

    client.query('SELECT * from stageus.user where id=\'' + reqId + '\'')
    .then(res => {
        if(res.rows.length == 0){
            client.query('INSERT INTO stageus.user(id, pw, name, phonenumber, address) values($1,$2,$3,$4,$5)',
                [reqId, reqPassword, reqName, reqPhoneNum, reqAddress])
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
        else{
            // already exist id
            result.description = "이미 존재하는 id입니다";
            response.send(result);
        }
    })
    .catch(e=>{
        // select error
        console.log(e);
        result.description = "정보 입력에 오류가 발생했습니다";
        response.send(result);
    });

    ///
});

module.exports = router;