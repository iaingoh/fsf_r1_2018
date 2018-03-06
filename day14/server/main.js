//Load express
const express = require('express');
//Need to read POST x-www-form-urlencodedor json 
const bodyParser = require('body-parser');
const momentTZ = require('moment-timezone');
const cors = require('cors');

//create an instance of express
const app = express();

//set up a rule to parse the request
//app.use(bodyParser.urlencoded());

//Setup rules for processing request

app.use(cors());

app.post('/timezone', 
    bodyParser.urlencoded(), 
	bodyParser.json(),
    (req, resp) => {
        const tz = req.body.tz;
        const name = req.body.name;

		console.log('tz = %s, name = %s', tz, name);

        const result = momentTZ().tz(tz).format('ha z');

        resp.status(200);
        resp.type('text/plain');
		//resp.set('Access-Control-Allow-Origin', '*');

		resp.format({
			'text/html': () => {
				resp.send(`<h1>hello: ${result}</h1>`);
			},
			'application/json': () => {
				resp.json({ time: result, timezone: tz });
			},
			'default': () => {
				resp.send(`Hello ${name}, tz: ${tz}, time: ${result}`);
			}
		});

        //resp.send('Hello ' + name + ', tz = ');
    }
);

app.get('/timezone', (req, resp) => {
    //read query string
    console.log('tz = ', req.query.tz);

    const result = momentTZ().tz(req.query.tz).format('ha z');

    resp.status(200).type('text/plain').end(result);
});

app.use(express.static(__dirname + '/public'));

//Start express 
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Application started on port %d', PORT);
});
