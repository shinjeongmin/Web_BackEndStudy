const elastic = require("elasticsearch");
const { Router } = require("express");
const { send } = require("process");
const router = require("express").Router();

router.get("/status", (req, res) => {
    const result={
        "status" : "disconnect",
    }

    const client = new elastic.Client({
        node: "http:localhost:9200/",
    })

    client.ping({requestTimeout:1000}, (err) =>{
        if(err){
            console.log("연결상태 불량 : " + err);
        } else{
            result.status = "connect";
            res.send(result);
        }
    })
});

router.post("/insert", (req, res) => {
    const data = req.body.name;

    const result={
        "success" : false,
    }

    const client = new elastic.Client({
        node: "http:localhost:9200/",
    })

    client.index({
        // cluster:
        // node:
        // cluster와 node가 한개씩이므로 굳이 설정할 필요없음
        index: "member",
        body:{
            name: data,
        }
    })
    .then(()=>{
        result.success = true;
        res.send(result);
    })
    .catch((err)=>{
        console.log("삽입 에러 : " + err);
    })
});

router.post("/read", (req, res) => {
    const data = req.body.name;

    const result={
        "data" : null
    }

    const client = new elastic.Client({
        node: "http:localhost:9200/",
    })

    client.search({
        index: "member",
        body: {
            query:{
                match:{
                    name: data
                }
            }
        }
    })
    .then((response)=>{
        
        const dataList =[];
        response.hits.hits.forEach((item)=>{
            dataList.push(item._source.name);
        })
        result.data = dataList;

        res.send(result);
    })
});

router.delete("/delete", (req, res) => {
    const data = req.body.name;

    const result={
        "success" : null
    }

    const client = new elastic.Client({
        node: "http:localhost:9200/",
    })

    client.deleteByQuery({
        index: "member",
        body: {
            query: {
                match:{
                    name : data
                }
            }
        }
    })
    .then(()=>{
        result.success = true;
        res.send(result);
    })
    .catch((err)=>{
        console.log("삭제 에러 : " + err);
    })
});

router.post("/", (req,res)=>{
    const result = {
        "success" : false,
    };

    const client = new elastic.Client({
        cloud:{
            id: "test:YXAtbm9ydGhlYXN0LTIuYXdzLmVsYXN0aWMtY2xvdWQuY29tOjkyNDMkYTRmOGY4ZTdkNDkxNGFlYTg4NmI2NjA5Mzg1NGUxOTYkYTY0NTBhNmNiMzJkNGQ4NmFmOWI5NDIyMjNkZDc3ZmE="
        },
        auth: {
            username:"elastic",
            password:"urPFyt86V4kvjMapY5QLmO1d",
        }
    })

    // 연결 테스트
    client.ping({requestTimeout: 1000}, (err) => {
        if(err) {
            console.log(err);
        }else{
            console.log("Is Running");
        }
    })

    // Read
    client.search({
        node: "특정 값",
        index:"특정 값",
        body: {
            query :{
                match: {
                    contents: "특정 단어"
                }
            }
        }
    })
    .then((result) => {
        console.log(result); // json 형태
    }).catch((err) => {
        console.log(err);
    });

    // Insert
    client.index({
        node: "특정 값", // 있을 수도 있고 없을 수도 없음
        index: "특정 값",
        body : {
            name: "jeongmin", 
        }
    })
    ,then(()=>{

    })
    .catch((err) =>{
        console.log(err);
    })
});

router.post("/autocomplete", (req, res) => {
    const data = req.body.name;

    const result={
        "data" : null
    }

    const client = new elastic.Client({
        node: "http:localhost:9200/",
    })

    client.search({ 
        index: "member",
        body: {
            query:{
                match_phrase_prefix:{
                    name: data
                }
            },
            // sort: {
            //     "name" : "desc"
            // }
        },
    })
    .then((response)=>{
        
        const dataList =[];
        response.hits.hits.forEach((item)=>{
            dataList.push(item._source.name);
        })
        result.data = dataList;

        res.send(result);
    })
    .catch((err)=>{
    });
});
    
module.exports = router;