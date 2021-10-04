const express = require("express");
const router = express.Router();
const redis = require("redis");

router.post("/increase", (req,res) =>{
    console.log("연결시도");
    const client = redis.createClient();

    client.on("error", (e) => {
        console.log("연결 실패");
    })
    client.on("ready", () => {
        console.log("연결 성공");

        const result = {
            "resultNum" : 0
        }
        client.exists(req.body.key, (err, value)=> {
            if(value == 1){ // 이미 해당 키 값을 가진 컬렉션이 있다
                client.get(req.body.key, (err2, num) => {
                    client.set(req.body.key, parseInt(num) + 1);
                    result.resultNum = parseInt(num) + 1;
                    res.send(result);
                })
            }
            else if(value == 0){ // 해당 키 값을 가진 컬렉션이 없다
                client.set(req.body.key, 1);
                result.resultNum = 1;
                res.send(result);
            }
        });
    })
});

router.post("/decrease", (req,res) => {

});

module.exports = router;