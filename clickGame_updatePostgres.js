const express = require("express");
const app = express();
const cron = require('node-cron');
const clickerGameDBUpdate = require("./router/clickerGameDBUpdate");
const httpPort = 3001;


const func = setInterval(() => { 
    clickerGameDBUpdate.updateCash2DB('testplayer');
 }, 5000);


app.listen(httpPort, (req, res) => {
    console.log(httpPort + "port clickGame postgres update 서버 실행");
});
