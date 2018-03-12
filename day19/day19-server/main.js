//load libraries
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

//load config
const mysqlConfig = require('./mysql-config');
const pool = mysql.createPool(mysqlConfig);

const mkQuery = (SQL, pool) => {
    return (params) => {
        const p = new Promise((resolve, reject) => {
            console.log("In closure: ", SQL);
            pool.getConnection((err, conn) => {
                if (err) {
                    reject({status: 500, error: err}); return;
                }
                conn.query(SQL, params || [],
                    (err, result) => {
                        try {
                            if (err)
                                reject(err);
                            else
                                reject({status: 400, error: err}); return;
                        } finally {
                            conn.release();
                        }
                    }
                )
            })
        })
        return (p);
    }
}

const app = express();

//set cors
app.use(cors());

//routes
const SELECT_FILMS = 'select film_id, title from film limit ? offset ?';
const selectFilms = mkQuery(SELECT_FILMS, pool);
app.get('/films', (req, resp) => {
    const limit = req.query.limit|| 20; 
    const offset = req.query.offset|| 0; 

    //selectFilms([ parseInt(limit), parseInt(offset) ])
    //    .then(result => {
    //        resp.status(200).json(result);
    //    })
    //    .catch(error => {

    //    })

    pool.getConnection((error, conn) => {
       if (error) {
           resp.status(500).json({error: error}); return;
       }
       conn.query(SELECT_FILMS, [ parseInt(limit), parseInt(offset) ],
           (error, results) => {
               try {
                   if (error) {
                       resp.status(400).json({error: error}); return;
                   }
                   resp.status(200).json(results);
               } finally {
                   conn.release();
               }
           }
       )
   });
});

const SELECT_BY_FILM_ID = 'select * from film where film_id = ?';
const selectByFilmId = mkQuery(SELECT_BY_FILM_ID, pool);
app.get('/film/:filmId', (req, resp) => {
    console.log(`film id = ${req.params.filmId}`);

    //selectByFilmId([ req.params.filmId])
    //    .then(result => {
    //        if (result.length)
    //            resp.status(200).json(result[0]);
    //        else
    //            resp.status(404).json({error: "Not found"});
    //    });

   pool.getConnection((error, conn) => {
       if (error) {
           resp.status(500).json({error: error}); return;
       }
       conn.query(SELECT_BY_FILM_ID, [ req.params.filmId],
           (error, result) => {
               try {
                   if (error) {
                       resp.status(400).json({error: error}); 
                       return;
                   }
                   if (result.length)
                       resp.status(200).json(result[0]);
                   else
                       resp.status(404).json({error: 'Not Found'});
               } finally { conn.release() ;}
           }
       )
   })
});

//examples from worksheet 
app.get('/weather/:city', (req, resp) => {
    console.log('city = ', req.params.city);
    const cities = req.params.city.split(',');
    console.log('cities = ', cities);
    resp.status(200).end();
})

app.get('/trip/:from/:to', (req, resp) => {
    console.log('/ from: %s, to: %s', req.params.from, req.params.to);
    resp.status(200).end();
})

app.get('/trip/:from-:to', (req, resp) => {
    console.log('from: %s, to: %s', req.params.from, req.params.to);
    resp.status(200).end();
})

app.get('/trip/:to', (req, resp) => {
    console.log('> to: ', req.params.to);
    resp.status(200).end();
});

//start the application
const PORT = process.argv[2] || process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log('Application started on port %d', PORT);
});