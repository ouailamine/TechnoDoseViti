// Load up routes

const appRouter = (app) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    treatedParcelTracks = require(__dirname+"/api/treatedParcelTrack.js")
    app.use('/treatedParcelTracks',treatedParcelTracks)

};

module.exports = appRouter;