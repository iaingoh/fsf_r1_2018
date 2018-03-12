const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost', port: 3306,
    user: 'fred', password: 'fred',
    database: 'sakila',
    connectionLimit: 4
});

pool.getConnection((error, conn) => {
    if (error) {
        console.error('error: ', error);
        return;
    }

    conn.ping((error) => {
        if (error) 
            console.error('error: ', error);
        else
            console.log('ping database');
        conn.release();
        process.exit(0);
    });

})