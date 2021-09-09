const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("./schema/userSchema");

router.post("/", (req,res) => {

    const result ={
        success : false,
    }

    mongoose.connect(
        "mongodb+srv://userShin:userpassword1234@cluster0.lr8si.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() =>{
        const user = new userSchema({
            id: req.body.id,
            pw: req.body.pw,
        });

        user.save((err, data) => {
            if(err){
                console.log("에러 발생 !");
            }else{
                result.success = true;
                console.log("성공!");
            }
        })

        res.send(result);
    })
    .catch((err) =>{
        console.log("디비 연결 실패!");
    })
})