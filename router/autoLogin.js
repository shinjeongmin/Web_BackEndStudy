const express = require("express")
const router = express.Router(); 
const path = require("path");
const {Client} = require('pg');

const client = new Client({
    user: 'user1',
    host: 'localhost',
    database: 'week1',
    password: '1234',
    port: 5432,
});

client.connect();

router.post("/", (req,response) => {
    const reqId = req.body.id;

    const result = {
        "success" : false
    };

    client.query('SELECT * from stageus.user where id=\'' + reqId + '\'', (err, res) => {
        console.log(res.rows);

        if(res.rows.length == 0){
            console.log("없는 id");
        }
        else{
            console.log('로그인 성공');
            result.success = true;
        }

        response.send(result);
    });
});

// router.get("/another", ())

module.exports = router;