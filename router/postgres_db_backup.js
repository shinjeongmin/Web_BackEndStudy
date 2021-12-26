const child_process = require('child_process');

module.exports.postgresDbBackup = ()=>{
    child_process.exec('sudo ~/BackEnd/postgres_db_backup.bat', (err, stdout) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('backup message : ' + stdout);
    });
}

module.exports.postgresDbSync = ()=>{
    child_process.exec('sudo ~/BackEnd/postgres_db_sync.bat', (err, stdout) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('DB sync message : ' + stdout);
    });
}