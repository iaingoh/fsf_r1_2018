const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const db = {};

app.use(cors());

app.get('/api/cart', (req, resp) => {

    const name = req.query.name || "XXYYZZ";
    if (!(name in db)) {
        resp.status(404).json({ message: "Not found"});
        return;
    }

    resp.status(200)
        .json({
			name: name,
            contents: db[name].contents,
			saved: db[name].saved
        });
});

app.post('/api/cart',
    bodyParser.json(),
    (req, resp) => {
        const name = req.body.name || null;
        const contents = req.body.contents || [];

		console.log('> body = ', req.body);

        if (!(contents.length && name)) {
            resp.status(400).json({message: "Bad request"});
            return;
        }

        db[name] = {
            contents: contents,
            saved: (new Date()).toString()
        }

        resp.status(201).json({});
    }
);

const PORT = process.argv[2] || process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.info('Application started on PORT %d', PORT);
});
