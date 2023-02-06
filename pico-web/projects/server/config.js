let config = {
    host: 'pico-web-db-1',
    user: 'dbuser',
    port: '3306',
    password: 'RaOo81243er6KFZ9',
    database: 'appdb',
    connectionLimit: 10
};
let cfg = JSON.parse(JSON.stringify(config));
cfg["password"] = "***";
console.log("-> | file: config.js | line 9 | config", cfg);
module.exports = config;
