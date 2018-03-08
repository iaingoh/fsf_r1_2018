//load the libraries
const express = require('express');
const mysql = require('mysql');

//create a connection pool
const pool = mysql.createPool({
    host: 'localhost', port: 3306,
    user: 'barney', password: 'barney',
    database: 'sakila', connectionLimit: 4
});

//create an instance of express
const app = express();

//routes here
// GET /search?q=KILL => %KILL%
// no record -> 404, 200 -> application/json
app.get('/search', (req, resp) => {

    if (!req.query.q) {
        resp.status(400).json({ message: 'missing search term'});
        return;
    }

    const q = `%${req.query.q}%`;

    pool.getConnection(
        (err, conn) => {
            if (err) {
                resp.status(500).json({error: err});
                return;
            }

            conn.query(
                'select * from film where title like ?',
                [ q ], // %KILL%
                (err, result) => { 
                    try {
                        if (err) { //check if we have an error
                            resp.status(500).json({error: err});
                        } else {
                            //See if result length is 0
                            if (result.length)
                                resp.status(200).json(result);
                            else
                                resp.status(404).json(
                                    {message: `No movie title with ${req.query.q}`}
                                );
                        }
                    } finally {
                        conn.release();
                    }
                }
            )
        }
    );
});

//start express
const PORT = process.argv[2] || process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log('Application has sterted on port %d', PORT);
    //Ping database
    pool.getConnection((err, conn) => {
        if (err) {
            console.error('Cannot get database connection');
            process.exit(-1);
        }
        conn.ping((err) => {
            try {
                if (err) {
                    console.log('Cannot ping database')
                    process.exit(-1);
                } else
                    console.log('Database is up');
            } finally {
                conn.release();
            }
        })
    });
});