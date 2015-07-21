'use strict';
var express = require('express');
var mongoose = require('mongoose');
var app = express();

var noteRoutes = express.Router();
require('./routes/router.js')(noteRoutes);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/restAPI');

app.use('/', noteRoutes);

app.listen(process.env.PORT || 8888, function() {
  console.log('server running on port ' + (process.env.PORT || 8888));
});
