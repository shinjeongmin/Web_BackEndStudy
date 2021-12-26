const express = require("express");
const app = express();
const httpPort = 3000;

const main = require("./testMain.js");
app.use("/",main);

app.listen(httpPort, (req,res) => {
        console.log(httpPort + "port server SILHANG");
});