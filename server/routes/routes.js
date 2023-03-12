// Load up routes
const treatedParcelTrack_route = require('./treatedParcelTrack_route');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    treatedParcelTrack_route(app, fs);

};

module.exports = appRouter;