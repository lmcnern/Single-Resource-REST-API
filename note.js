var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  author: {type: String, default: 'Anon'},
  body: String,
});

module.exports = mongoose.model('note', noteSchema);
