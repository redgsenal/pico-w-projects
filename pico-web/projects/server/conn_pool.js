let mysql = require('mysql2');
let config = require('./config.js');

class ConnPool {
    constructor() {
        this.pool = mysql.createPool(
            config
        );
        this.conn = mysql.createConnection(config);
    }

    static close (conn) {
        if (conn) {
            conn.release();            
            conn.destroy();
        }
    }

    static end(conn){
        if (conn){
            conn.end();
        }
    }

    static conn(){
        return mysql.createConnection(config);
    }
}
module.exports = ConnPool;