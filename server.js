const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const fs = require('fs'); // filestream
const https = require("https"); // http는 express에 자동으로 임포트
const app = express();
const httpPort = 3000; // 포트는 1024 밑으로는 접근 불가
const httpsPort = 4000;

const options = {
    key: fs.readFileSync(path.join(__dirname, "private.pem")), // private
    cert: fs.readFileSync(path.join(__dirname, "public.pem")), // public
    // ca: , // 인증서란, 실제 서비스에는 ca라는 키가 반드시 필요
}

app.use(express.json()); // stringify를 자동으로 json으로 적용

app.use(cookieParser('abcdef'));

app.get("*", (req,res, next) =>{
    const protocol = req.protocol;
    // console.log(protocol);

    if(protocol == "https"){
        next(); // 아래 위치한 API들로 넘어갈 수 있도록 해줌.
    }else{
        const newDestination = "https://" + req.hostname + ":4000" + req.url;
        res.redirect(newDestination);
    }
})
// redirect코드는 반드시 다른 API들 위에 있어야 함

/// 해당 모듈화 하는 형태를 미들웨어라고 호칭
const main = require("./router/main.js")
app.use("/main", main);
///

const login = require("./router/login.js");
app.use("/login", login);

const createAccount = require("./router/createAccount.js");
app.use("/createAccount", createAccount);

const cookie = require("./router/cookie.js");
app.use('/cookie', cookie);

// bash script execute router test
// const test = require("./router/postgres_db_backup");
// test.postgresDbBackup();

// const createAccount_mongo = require("./router/createAccount_mongo.js");
// app.use("/createAccount_mongo", createAccount_mongo);

// listen은 서버를 여는 동작이므로 가장 마지막에 실행
// listen의 매개변수 (httpPort, method(request, response))
app.listen(httpPort, (req, res) => {
    console.log(httpPort + "번으로 서버가 실행됨");
});

https.createServer(options, app).listen(httpsPort, (req,res) => {
    console.log(httpsPort + "번으로 서버가 실행됨");
})