const express = require("express");
const router = express.Router();
const redis = require("redis");
const path = require('path');

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../clickerGame.html")); 
});

router.post('/getPlayerInfo', (req,res) => {
    const client = redis.createClient();

    client.on("error", (e) => {
        console.log("redis 연결 실패");
    })
    client.on("ready", () => {
        // key : playerinfo, field : 'playername', value : json data
        client.hexists("playerinfo", req.body.playerInfo.name, (err, value)=>{
            if(value == 1){ // playerInfo exist
                client.hget('playerinfo', req.body.playerInfo.name, (err2, obj)=>{
                    if(err2){
                        console.log(err2);
                        res.end();
                    }
                    else{
                        obj = JSON.parse(obj);
                        obj.message = "데이터 가져오기 성공";
                        res.send(obj);
                    }
                })
            }
            else{ // playerInfo not exist
                console.log('not exist ' + req.body.playerInfo.name +'\'s data in redis');
                obj = JSON.parse(obj);
                obj.message = "플레이어 정보가 존재하지 않음";
                res.send(obj);
            }
        })
    })
});

router.get('/createPlayerInfo', (req,res)=>{
    const client = redis.createClient();

    client.on("error", (e) => {
        console.log("redis 연결 실패");
    })
    client.on("ready", () => {

    })
});

router.post('/hunting', (req,res)=>{
    const client = redis.createClient();

    client.on("error", (e) => {
        console.log("redis 연결 실패 : " + e);
    })
    client.on("ready", () => {
        const result  ={
            "level" : 0,
            "experience" : 0,
            "attack" : 0,
            "gold" : 0,
            "message" : "",
        }
        // key : playerinfo, field : 'playername', value : json data
        client.hexists("playerinfo", req.body.playerInfo.name, (err, value)=>{
            if(value == 1){ // playerInfo exist
                client.hget('playerinfo', req.body.playerInfo.name, (err2, obj)=>{
                    if(err2){
                        console.log(err2);
                        res.end();
                    }
                    else{
                        obj = JSON.parse(obj);
                        obj.experience += 12;
                        // experience check
                        if(obj.experience >= 100){
                            obj.experience -= 100;
                            obj.level += 1;
                        }
                        obj.gold += 2;
                        client.hset('playerinfo', req.body.playerInfo.name, JSON.stringify(obj));
                        obj.message = "사냥 성공";
                        res.send(obj);
                    }
                })
            }
            else{ // playerInfo not exist
                console.log('not exist ' + req.body.playerInfo.name +'\'s data in redis');
                result.message = "오류 : 사냥 실패";
                res.send;
            }
        })
    })
});

router.post('/buyItem', (req,res)=>{
    const client = redis.createClient();

    client.on("error", (e) => {
        console.log("redis 연결 실패 : " + e);
    })
    client.on("ready", () => {
        // key : playerinfo, field : 'playername', value : json data
        client.hexists("playerinfo", req.body.playerInfo.name, (err, value)=>{
            if(value == 1){ // playerInfo exist
                client.hget('playerinfo', req.body.playerInfo.name, (err2, obj)=>{
                    if(err2){
                        console.log(err2);
                        res.end();
                    }
                    else{
                        obj = JSON.parse(obj);
                        // check can buy
                        if(obj.gold - 2 < 0){
                            client.hset('playerinfo', req.body.playerInfo.name, JSON.stringify(obj));
                            obj.message = "골드 부족";
                            obj.alert = true;
                            res.send(obj);
                            return;
                        }
                        obj.gold -= 2;
                        obj.attack += 12;
                        client.hset('playerinfo', req.body.playerInfo.name, JSON.stringify(obj));
                        obj.message = "아이템 구입 성공";
                        res.send(obj);
                    }
                })
            }
            else{ // playerInfo not exist
                console.log('not exist ' + req.body.playerInfo.name +'\'s data in redis');
                result.message = "오류 : 아이템 구입 실패";
                res.send();
            }
        })
    })
});

module.exports = router;

/*
request form

"playerInfo" : {
    "name" : "testplayer",
    "keyLevel" : "level",
    "keyExperience" : "experience",
    "keyAttack" : "attack",
    "keyGold" : "gold",
    // 레벨, 경험치, 공격력, 골드 
}
*/