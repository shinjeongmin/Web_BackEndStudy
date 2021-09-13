const {Client} = require('pg');

const client = new Client({
    user: 'user1',
    host: 'localhost',
    database: 'week1',
    password: '1234',
    port: 5432,
});

client.connect()
.then(()=> console.log('server connected'))
.catch((err) => {
    console.log('DB connect error!');
    console.log(err);
});

module.exports = client;