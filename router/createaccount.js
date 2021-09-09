const express = require("express");
const router = express.Router(); 
const path = require("path");
const {Client} = require('pg');

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../createaccount.html"));
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
    const reqName = req.body.name;
    const reqPhoneNum = req.body.phoneNum;
    const reqAddress = req.body.address;

    const result = {
        "success" : false
    };

    client.query('SELECT * from stageus.user where id=\'' + reqId + '\'', (err, res) => {
        console.log(res.rows);

        if(res.rows.length == 0){
            client.query('INSERT INTO stageus.user(id, pw, name, phonenumber, address) values('+
            '\'' + reqId + '\'' + ', ' +
            '\'' + reqPassword + '\'' + ', ' +
            '\'' + reqName + '\'' + ', ' +
            '\'' + reqPhoneNum + '\'' + ', ' +
            '\'' + reqAddress + '\'' + ') returning *', (err,res) =>{
                console.log('회원가입 성공')
                result.success = true;
                response.send(result);
            })
        }
        else{
            console.log("이미 존재하는 id");
            response.send(result);
        }
    });

    ///
});

module.exports = router;