//load libraries
const path = require('path');
const express = require('express');

//create an instance of express
const app = express();

//start the server
const PORT = parseInt(process.argv[2]) || process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log('Application started on port %d', PORT);
});

//Define route handles
app.get('/menu', (req, resp) => {
    //set the status
    resp.status(200);
    //set the media /mime type
    resp.type('text/html');
    //sent the content
    resp.send('<h2>Today\'s menu is FISH</h2>');
});

app.get('/operation-hours', (req, resp, next) => {
    console.log('check if it is public holiday')
    const publicHoliday = false;
    if (publicHoliday) {
        resp.status(200);
        resp.type('text/html');
        resp.send('<h2>public holiday</h2>');
        return;
    }
    next()
});

app.use('/operation-hours', (req, resp) => {
    const time = 2230;

    console.log('in app.use: ', req.publicHoliday);

    resp.status(200);
    //resp.type('text/html');
    resp.type('application/json');
    resp.set('X-Company-Name', 'hello-world');

    if (time < 1200)
        //resp.send('<h2>We are open at 1200</h2>');
        resp.json({open: false, messsage: 'Open at 1200'})

    else if ((time >= 1200) && (time <= 2200)) 
        //resp.send('<h2>We are open!</h2>');
        resp.json({open: true})

    else
        //resp.send('<h2>We are closed for the day</h2>');
        resp.json({open: false, message: 'Closed for the day'});
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, resp) => {
    resp.status(404);
    resp.type('text/html');
    resp.sendFile(path.join(__dirname, "public", "error.html"));
    //resp.redirect('/error.html');
});