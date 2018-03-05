//load express
const express = require('express');

const IMAGES = [ 'dog.png', 'icon.png', 'placeholder.png' ];

//create an instance of express
const app = express();

//Route handlers
// GET /image - text/html, image/png, applicaiton/json
app.get('/image', (req, resp) => {

    resp.status(200);

    //Randomly select an image
    const rndIdx = Math.floor(Math.random() * IMAGES.length);

    resp.format({
        'text/html': () => {
            console.log('text/html')
            resp.send(`<html><head><title>Image of the Day</title></head><body><img src="/${IMAGES[rndIdx]}"></body></html>`);
        },

        'image/png': () => {
            console.log('image/*')
            resp.sendFile(__dirname + "/media/" + IMAGES[rndIdx]);
        },

        // { 'image': 'url' }
        'application/json': () => {
            console.log('application/json')
            resp.json({
                image: `/${IMAGES[rndIdx]}`
            });
        },

        'default': () => {
            console.log('default')
            resp.status(406);
            resp.end(`Cannot return media type: ${req.get('Accept')}`);
        }

    });
});

/*
app.get('/image', (req, resp) => {
    const rndIdx = Math.floor(Math.random() * IMAGES.length);
    resp.status(200);
    resp.type('text/html');
    resp.send(`<html><head><title>Image of the Day</title></head><body><img src="/${IMAGES[rndIdx]}"></body></html>`);
});

app.get('/random-image', (req, resp) => {
    const rndIdx = Math.floor(Math.random() * IMAGES.length);
    resp.status(200);
    resp.set('Cache-Control', 'public, max-age=0');
    resp.type('image/png');
    resp.sendFile(__dirname + "/media/" + IMAGES[rndIdx]);
});
*/

//because images are static and they are from media directory
app.use(express.static(__dirname + "/media"));

app.use(express.static(__dirname + "/public"));

const PORT = process.argv[2] || process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.info('Application started on port %d at %s', PORT, new Date());
});