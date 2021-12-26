const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

// middle ware
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});

// middle ware
const elastic = require("./router/elastic.js");
app.use("/elastic", elastic);

// listen
app.listen(port, (req,res) =>{
    console.log("서버실행");
});