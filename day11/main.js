//import * from Express;
const express = require('express');

//Create an Express application
const app = express();

//define a port
const PORT = parseInt(process.argv[2]) || process.env.APP_PORT || 3000;

//Handle the request
//middleware - is a function that handles a request
//express.static() is the middleware
app.use(express.static(__dirname + "/public"));

//rules that come after express.static means that the
//resource/file is not in public
app.use(function(req, resp) {
    //redirect the browser to load the 404.html - 302
    resp.redirect('/404.html');
});

//Start the Express server
app.listen(PORT, () => {
    console.log('Application started on port %d', PORT);
});