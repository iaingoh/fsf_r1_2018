//Load the libraries
const path = require('path');
const express = require('express');

//Create an instance of express
const app = express();

//Configure the port
const PORT = process.argv[2] || process.env.APP_PORT || 3000;

//Configure the routes
//public

app.use(express.static(path.join(__dirname, "public")));

//media
app.use('/images', express.static(path.join(__dirname, "media")));

//fake page
app.use((req, resp) => {
    resp.redirect('https://www.google.com');
});


//Start the app
app.listen(PORT, () => {
    //String interpolation -- supported in ES6
    console.log(`Application started on port ${PORT}`);

    //String concatenation
    //console.log('Application started on port ' + PORT);
});