const { response } = require('express');
const express = require('express');
const router = require("express").Router();
const request = require('request');
const path = require("path");
const configNaver = require('../config/oauth_naver');
const client_id = configNaver.clientId;
const client_secret = configNaver.clientSecret;
const state = "1234";
const redirectURI = encodeURI(configNaver.callbackURL);

// token을 클라이언트에게 어떻게 전달하는가?
const token = {
    access_token : "",
    refresh_token : "",
    token_type : "",
    expires_in : "",
}

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../login.html")); // __dirname 현재 파일 경로
});

router.get("/login", (req, res)=>{
    const api_url = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' +client_id
    + '&redirect_uri='+ redirectURI + '&state=' + state;
    
    const result = {api_url : api_url,}
    res.send(result);
    return;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
});

router.get('/logout', (req,res)=>{
    console.log(token);
    // 공식문서에 '&service_provider=NAVER'를 추가해야한다는 정보가 없음
    const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id='
    + client_id + '&client_secret=' + client_secret + '&access_token=' + token.access_token + '&service_provider=NAVER';
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.sendFile(path.join(__dirname, "../login.html")); // __dirname 현재 파일 경로
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

router.get("/callback", (req,res)=>{
    let code = req.query.code;
    let state = req.query.state;
    const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + this.state;
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            // token 저장 (여기 어떻게 처리해야하지?)
            token.access_token = JSON.parse(body).access_token;
            token.refresh_token = JSON.parse(body).refresh_token;
            token.token_type = JSON.parse(body).token_type;
            token.expires_in = JSON.parse(body).expires_in;
            
            res.end(body);
            // res.sendFile(path.join(__dirname, "../naverCallback.html")); // __dirname 현재 파일 경로
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

router.post('/member', (req, res)=>{
    // const token = req.body.token;
    const header = "Bearer " + token.access_token;
    const api_url = "https://openapi.naver.com/v1/nid/me";
    const options = {
        url : api_url,
        headers : {'Authorization' : header}
    };
    request.get(options, (error, response, body)=>{
        if(!error && response.statusCode == 200){
            console.log(body);
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            console.log('error');
            if(response != null) {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        }
    })
});

module.exports = router;

/*
https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=xDicgD3h9hY3CLwziqVn&redirect_uri=https://13.209.77.211:4000/naver/callback&state=1234;
*/