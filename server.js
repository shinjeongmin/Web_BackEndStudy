const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000; // 포트는 1024 밑으로는 접근 불가

app.use(express.json()); // stringify를 자동으로 json으로 적용

app.use(cookieParser('abcdef'));

/// 해당 모듈화 하는 형태를 미들웨어라고 호칭
const main = require("./router/main.js")
app.use("/main", main);
///

const login = require("./router/login.js");
app.use("/login", login);

const autoLogin = require("./router/autoLogin.js");
app.use("/autoLogin", autoLogin);

const createaccount = require("./router/createaccount.js");
app.use("/createaccount", createaccount);

const cookie = require("./router/cookie.js");
app.use('/cookie', cookie);

// listen은 서버를 여는 동작이므로 가장 마지막에 실행
// listen의 매개변수 (port, method(request, response))
app.listen(port, (req, res) => {
    console.log(port + "번으로 서버가 실행됨");
});