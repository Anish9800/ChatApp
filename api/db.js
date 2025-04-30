import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'anish',
    password: '',
    database: '',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

try{
    const conn = await pool.getConnection();
    console.log("db connecetd");
    pool.releaseConnection(conn);
}
catch(err){
    console.log(`error connection ${err}`);
}

export default pool
