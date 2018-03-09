//install modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const dbConfig = require('./dbconfig');

//create a connection pool for mysql
const pool = mysql.createPool(dbConfig);

//create an instance of express
const app = express();

//enable CORS for all routes
app.use(cors());

//Configure routes
// GET /customers?offset=n&limit=n
// select * from CUSTOMER offset ? limit ?
const SQL = ' select * from CUSTOMER limit ? offset ?';
app.get('/customers', (req, resp) => {
    const offset = parseInt(req.query.offset) || 5;
    const limit = parseInt(req.query.limit) || 0;

    pool.getConnection((err, conn) => {
        if (err) {
            resp.status(500).json({ error: err });
            return;
        }

        conn.query(SQL, [ limit, offset ],
            (err, results) => {
                try {
                    if (err) {
                        resp.status(400).json({ error: err });
                        return;
                    }
                    resp.status(200);
                    resp.format({
                        'application/json': () => {
                            resp.json(results);
                        },
                        'text/csv': () => {
                            resp.send(toCSV(results));
                        },
                
                        'default': () => {
                            resp.status(406).json({ error: 'Not supported'});
                        }
                    });
                } finally { conn.release(); }
            }
        )
    });
});

app.use(express.static(__dirname + '/public'));

const toCSV = function(results) {

    if (!(results && results.length)) 
        return ('');

    //{ customer_id: 1, name: 'fred', address: '' }
    let csv = ''

    //Create the header
    let c = []
    let headers = Object.keys(results[0]);
    csv = headers.join(',') + '\r\n';

    for (let rec of results) { 
        c = []
        for (let field of headers)
            c.push(rec[field])
        csv = csv + c.join(',') + '\r\n';
    }

    return (csv);
}

//set port
const PORT = process.argv[2] || process.env.APP_PORT || 3000;

//Only start the application if the db is up
console.log('Pinging database...');
pool.getConnection((err, conn) => {
    if (err) {
        console.error('>Error: ', err);
        process.exit(-1);
    }

    conn.ping((err) => {
        if (err) {
            console.error('>Cannot ping: ', err);
            process.exit(-1);
        }
        conn.release();

        //Start application only if we can ping database
        app.listen(PORT, () => {
            console.log('Starting application on port %d', PORT);
        });
    });
});
