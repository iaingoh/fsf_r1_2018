const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost', port: 3306,
    user: 'barney', password: 'barney', //dbuser
    database: 'sakila', //database I'm going to use
    connectionLimit: 4 //number of connection in the pool
});

const SQL0 = 'select film_id, title, release_year from film limit 10';
const SQL1 = 'select * from film where title like ? and release_year > ?';

//checking out a connection from the pool
pool.getConnection(
    (err, conn) => { //1st is err, 2nd is the connection
        //Check if there are any errors
        if (err) {
            console.error('> getConnection error: ', err);
            return;
        }

        //No errors so we have a connection 
        conn.query(
            //SQL0, //SQL statement
            SQL1,
            ['%AIR%', 2004], //parameter from left to right
            (err, result) => { //1st is the err, 2nd is the result
                try {
                    if (err) { //check for query error eg. syntax
                        console.error('> query error: ', err)
                    } else {
                        /* [ {...}, {...}, ... ] */
                        for (let r of result) {
                            console.info('\ttitle: %s, release_year: %d ', r.title, r.release_year);
                        }
                    }
                } finally {
                    conn.release(); //MUST release connection
                    //YOu cannot access connection 
                }
            }
        );
    }
);