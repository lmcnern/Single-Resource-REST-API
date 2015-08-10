'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', '$http', function ($scope, $http) {
    $scope.notes = [];
    $scope.errors = [];
    $scope.attrs = ['name', 'species', 'location'];

    $scope.getAll = function() {
      $http.get('/api/notes')
        .then(function(res) {
          $scope.notes = res.data;
        }, function(res) {
          $scope.errors.push(res.data);
          console.log(res.data);
        });
    };

    $scope.create = function(note) {
      $scope.newNote = null;
      $http.post('/api/note', note)
        .then(function(res) {
          $scope.notes.push(note);
          note = null;
        }, function(res) {
          console.log(res.data);
          $scope.errors.push(res.data);
        });
    };

    $scope.update = function(note) {
      $scope.editNote = null;
      var i = $scope.notes.indexOf(note);
      $http.put('/api/notes/' + note._id, note)
        .then(function(res) {
          $scope.notes[i] = note;
          note.editing = false;
        }, function(res) {
          note.editing = false;
          $scope.errors.push(res.data);
          console.log(res.data);
        });
      };

    $scope.startEdit = function(note) {
      note.editing = true;
      note.oldName = note.name;
      note.oldSpecies = note.species;
      note.oldLocation = note.location;
    };

    $scope.cancelEdit = function(note) {
      note.name = note.oldName;
      note.species = note.oldSpecies;
      note.location = note.oldLocation;
      note.editing = false;
    };

    $scope.destroy = function(note) {
      $http.delete('/api/note/' + note._id)
        .then(function(res) {
          $scope.notes.splice($scope.notes.indexOf(note), 1);
        }, function(res) {
          $scope.errors.push(res.data);
          console.log(res.data);
        });
     };
   }]);
 };
