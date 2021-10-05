const express = require("express");
const redis = require("redis");
const dao = require('./DAO/dao');

module.exports.updateCash2DB = (name) => {
    console.log("실행 중...");

    const client = redis.createClient();

    client.on("error", (e) => {
        console.log("redis 연결 실패");
    })
    client.on("ready", () => {
        client.hexists("playerinfo", name, (err, value)=>{
            if(value == 1){ // playerInfo exist
                client.hget('playerinfo', name, (err2, obj)=>{
                    if(err2){
                        console.log(err2);
                        res.end();
                    }
                    else{
                        obj = JSON.parse(obj);
                        dao.selectFromClickGameUserDB(name)
                        .then(res => {
                            if (res.rows.length == 0) {
                                // TODO :
                                dao.insertIntoClickGameUserDB(name, obj.level, obj.experience, obj.attack, obj.gold)
                                .then((err, res)=>{
                                    console.log("click game insert 성공");
                                })
                                .catch(err=>{
                                    console.log("click game insert error");
                                    console.log(err);
                                })
                            }
                            else {
                                dao.updateSetClickGameUserDB(name, obj.level, obj.experience, obj.attack, obj.gold)
                                .then((err, res)=>{
                                    console.log("click game update 성공");
                                })
                                .catch(err => {
                                    console.log("click game update error");
                                    console.log(err);
                                })
                            }
                        });
                    }
                })
            }
            else{ // playerInfo not exist
                console.log('not exist ' + name +'\'s data in redis');
                console.log("플레이어 정보가 존재하지 않음");
            }
        })
    })
}