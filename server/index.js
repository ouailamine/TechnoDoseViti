const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extented: true}));

app.use(cors());

const fs = require('fs');

// handle the routes
// const routes = require('./routes/routes.js')(app,fs);

// const routesBis = require(__dirname+'/routes/routesBis.js');
// app.use('/',routesBis);

treatedParcelTracks = require(__dirname+"/routes/api/treatedParcelTrack.js")
app.use('/',treatedParcelTracks)


// const morphoPulve = require('./morphoPulve')
// app.use("/morphoPulve",morphoPulve)

// Handle production in Heroku
if(process.env.NODE_ENV === 'production'){
    // Static folder 
    app.use(express.static(__dirname+'/public'));// __dirname means . (i.e., current directory)

    // Handle Single Page application
    // for any other routes redirect it to index.html
    app.get(/.*/,(req,res)=> res.sendFile(__dirname+'/public/index.html'));
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`))

module.exports = app;
