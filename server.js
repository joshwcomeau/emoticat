// DEFAULT API SERVER

// vendor module dependencies
var Percolator  = require('percolator').Percolator;
var mongoose    = require('mongoose');

// local module dependencies
var catRoutes   = require('./app/routes/cat.routes.js');
var userRoutes  = require('./app/routes/user.routes.js');
var dbSettings  = require('./app/db_settings.js');

var port        = 3000;

// 'global' variables and Percolator settings go here
var app         = {
  port: port
}; 

var server      = new Percolator(app);




mongoose.connect(dbSettings.url);
var db = mongoose.connection;

// Database error logging
db.on('error', console.error.bind(console, 'connection error:'));


// ROUTES
server.route('/cats',     catRoutes.cats);
server.route('/cats/:id', catRoutes.catsWithId);
server.route('/users',    userRoutes.users);


// Some logging
server.before(function(req, res, handler, cb) {
  console.log('Request:', req.method, "to", req.url);
  console.log('API key:', req.headers.api_key)
  cb();
});

// Gogogo!
server.listen(function(err) {
  console.log("Server is listening on port", server.port);
});