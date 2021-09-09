const express = require("express");
const router = express.Router(); 
const path = require("path");
const {Client} = require('pg');
const cookieParser = require('cookie-parser');

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../login.html")); // __dirname 현재 파일 경로
});

const client = new Client({
    user: 'user1',
    host: 'localhost',
    database: 'week1',
    password: '1234',
    port: 5432,
});

client.connect();

router.post("/", (req, response) => {
    const reqId = req.body.id;
    const reqPassword = req.body.pw;

    const result = {
        "success" : false
    };

    client.query('SELECT * from stageus.user where id=\'' + reqId + '\'', (err, res) => {
        console.log(res.rows);

        if(res.rows.length == 0){
            console.log("없는 id");
        }
        else{
            // check pass word
            if(res.rows[0].pw == reqPassword){
                console.log('로그인 성공');
                result.success = true;
                // response.cookie('userid', reqId);
            }
            else{
                console.log('잘못된 pw');
            }
        }

        response.send(result);
    });
});

module.exports = router;

// body parser를 이용할 때는 object명이 반드시 body이어야 함
// const body = {
//     "id" : "stageus",
//     "pw" : "1234"
// };