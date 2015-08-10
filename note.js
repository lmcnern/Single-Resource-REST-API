var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  name: {type: String, default: 'Anon'},
  species: {type: String, default: 'an note'},
  location: String,
});

module.exports = mongoose.model('note', noteSchema);
