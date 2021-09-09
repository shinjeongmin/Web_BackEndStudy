const express = require("express")
const router = express.Router(); 
const path = require("path");

router.get("/", (req,res)=>{
    const result = req.signedCookies['userid'];
    
    res.send(
        {
            "id": result
        }
    );
});

router.post("/", (req,res) => {
    const userId = req.body.id;

    res.cookie('userid', userId, {signed:true});

    res.send();
});

router.delete("/", (req,res) =>{
    res.clearCookie('userid');
    
    res.send();
});

module.exports = router;