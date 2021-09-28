const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey');

router.post("/", (req,res) =>{
    const id = req.body.id;
    const pw = req.body.pw;

    const result = {
        "success" : false,
        "message" : "",
        "token" : null,
    }

    try{
        // 데이터베이스에서 아이디, 비밀번호 검증
        const fromDbId = "stageus";
        const fromDbPw = "1234";

        if(id == fromDbId && pw == fromDbPw){
            const signedJwt = jwt.sign(
                {
                    id : fromDbId,
                    name: "스테이지어스",
                    email : "cono@stageus.co.kr"
                },
                secretKey,
                {
                    // 만료시간
                    expiresIn: "3s",
                    // 토큰 발급자
                    issuer : "stageus",
                }
            )

            result.success = true;
            result.message = "인증 성공";
            result.token = signedJwt;
            res.send(result);
        }
        else{
            // 로그인 정보 오류시
            result.message = "로그인 정보 오류";
            res.send(result); 
        }
    }
    catch(error){
        // 서버 오류로 인한 토큰 발급 오류
        result.message = "서버 문제로 토큰 발급 불가";
        res.send(result);
    }
})

router.post("/verify", (req,res) => {
    const result = {
        "success" : false,
        "message" : "",
    }

    try{
        req.decoded = jwt.verify(req.headers.auth, secretKey);
        result.success = true;
        result.message = "인증 성공";
        res.send(result);
    }
    catch(error){
        if(error.name == "TokenExpiredError"){
            result.message = "토큰이 만료되었습니다.";
        }
        else{
            result.message = "토큰이 유효하지 않습니다";
        }
        res.send(result);
    }
})

module.exports = router;