'use strict';
require('../../app/js/client.js');
require('angular-mocks');

describe('notes controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a new controller', function() {
    var notesController = $ControllerConstructor('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(typeof $scope.getAll).toBe('function');
    expect(Array.isArray($scope.notes)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('notesController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request when getAll is called', function() {
      $httpBackend.expectGET('/api/notes')
        .respond(200, [{name: 'test animal', species: 'test', location: 'test place', _id: 1}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.notes.length).toBe(1);
      expect($scope.notes[0].name).toBe('test animal');
      expect($scope.notes[0]._id).toBe(1);
      expect($scope.notes[0].species).toBe('test');
      expect($scope.notes[0].location).toBe('test place');
    });

    it('should make a POST request when create is called', function() {
      var testNote = {name: 'another animal', species: 'another species', location: 'another place', _id: 2};
      expect($scope.notes.length).toBe(0);
      $httpBackend.expectPOST('/api/note', testNote)
        .respond(200, {name: 'test animal', species: 'test', location: 'test place', _id: 1});
      $scope.create(testNote);
      $httpBackend.flush();
      expect($scope.notes.length).toBe(1);
      expect($scope.notes[0].name).toBe('another animal');
      expect($scope.notes[0]._id).toBe(2);
      expect($scope.notes[0].species).toBe('another species');
      expect($scope.notes[0].location).toBe('another place');
    });

    it('should make a PUT request when update is called', function() {
      var note = {_id: 1, editing: true};
      $httpBackend.expectPUT('/api/notes/1').respond(200);
      $scope.update(note);
      $httpBackend.flush();
      expect(note.editing).toBe(false);
    });

    it('should make a DELETE request when destroy is called', function() {
      var note = {_id: 1, name: 'test note'};
      $scope.notes = [{name: 'some note', _id: 2}, note, {name: 'another test note', _id: 3}];
      $httpBackend.expectDELETE('/api/note/1').respond(200);
      $scope.destroy(note);
      $httpBackend.flush();
      expect($scope.notes.length).toBe(2);
      expect($scope.notes.indexOf(note)).toBe(-1);
      expect($scope.notes[0].name).toBe('some note');
      expect($scope.notes[1].name).toBe('another test note');
    });
  });
});
