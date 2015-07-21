var Note = require('../note.js'); // if note is in the parent directory, should be ../note.js
var bodyParser = require('body-parser');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.get('/note', function(req, res) {
    Note.find({}, function(err, data) {
      if (err) {
        console.log('GET error ' + err + '.');
        return res.status(500).json({'msg': 'error!'});
      } else {
        res.json(data);
      }
      });
    });

  router.post('/note', function(req, res) {
    var newNote = new Note(req.body);
    newNote.save(function (err, data) {
      if (err) {
        console.log('POST error ' + err + '.');
        return res.status(500).json({'msg': 'error!'});
      } else {
        res.json(data);
      }
      });
    });

  router.delete('/note/:id', function(req, res) {
    Note.remove({_id: req.params.id }, function(err, data) {
      if (err) {
        console.log('DELETE error ' + err + '.');
        return res.status(500).json({'msg': 'error!'});
      } else {
        res.json(data);
      }
      });
    });


  router.put('/note/:id', function(req, res) {
    var updateNote = req.body;
    // wipe out the id in the body
    delete updateNote._id;
    Note.findByIdAndUpdate(req.params.id, updateNote, function(err, saved) {
      if (err) {
        console.log('PUT error ' + err + '.');
        return res.status(500).json({'msg': 'error!'});
      } else {
        res.json(saved);
      }
      });
    });
  };
