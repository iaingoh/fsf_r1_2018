//load the modules
//import 
const path = require('path');
const express = require('express');

//create an instance of express
const app = express();

//define routes
//resolve files in public 
app.use((req, resp, next) => {
    console.log('path = ', req.originalUrl);
    if (req.originalUrl == '/abc') {
        resp.send('abc');
        return;
    }

    next();
});
app.use(express.static(path.join(__dirname, 'public')));

//handle error
app.use((req, resp) => {
    resp.redirect('/404.html');
})

//setup our server
const PORT = process.argv[2] || process.env.APP_PORT || 3000;

//start the server
app.listen(PORT, () => {
    console.info('Application started on port %d', PORT);
});