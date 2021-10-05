const express = require("express");
const router = express.Router(); 
const client = require('../connectClient_pg');

module.exports.selectFromUserDB = id => {
    return client.query('SELECT * from stageus.user where id=$1', [id]);
}  

module.exports.insertIntoUserDB = (id, pw, name, phoneNumber, address) => {
    return client.query('INSERT INTO stageus.user(id, pw, name, phonenumber, address) values($1,$2,$3,$4,$5)'
        , [id, pw, name, phoneNumber, address]);
}

module.exports.selectFromClickGameUserDB = name => {
    return client.query('SELECT * from stageus.clickgameuser where playername=$1', [name]);
}

module.exports.insertIntoClickGameUserDB = (name, level, exp, atk, gold) => {
    return client.query('INSERT INTO stageus.clickgameuser(playername, level, experience, attack, gold) values($1,$2,$3,$4,$5)'
    , [name, level, exp, atk, gold]);
}

module.exports.updateSetClickGameUserDB = (name, level, exp, atk, gold) => {
    return client.query('UPDATE stageus.clickgameuser set (level, experience, attack, gold) = ($2,$3,$4,$5) where playername=$1',
     [name, level, exp, atk, gold]);
}