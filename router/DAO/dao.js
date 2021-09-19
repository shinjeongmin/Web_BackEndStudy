const express = require("express");
const router = express.Router(); 
const client = require('./connectClient_pg');

module.exports.selectFromUserDB = id => {
    client.query('SELECT * from stageus.user where id=$1', [id]);
}  

module.exports.insertIntoUserDB = (id, pw, name, phoneNumber, address) => {
    client.query('INSERT INTO stageus.user(id, pw, name, phonenumber, address) values($1,$2,$3,$4,$5)'
        , [id, pw, name, phoneNumber, address]);
}