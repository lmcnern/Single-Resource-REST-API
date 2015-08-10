'use strict';
var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/app'));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/restAPI');

var noteRoutes = express.Router();
require('./routes/notes_routes.js')(noteRoutes);
app.use('/api', noteRoutes);

app.listen(process.env.PORT || 8888, function() {
  console.log('server running on port ' + (process.env.PORT || 8888));
});
