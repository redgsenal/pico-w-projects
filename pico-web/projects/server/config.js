let config = {
    host: 'localhost',
    user: 'dbuser',
    port: '3089',
    password: 'oUwr3148QNCPI27Y',
    database: 'appdb',
    connectionLimit: 10
};
let cfg = JSON.parse(JSON.stringify(config));
cfg["password"] = "***";
console.log("-> | file: config.js | line 9 | config", cfg);
module.exports = config;
