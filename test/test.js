'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Note = require('../note.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/restAPI';
// require('./app/');

describe('REST api', function() {

  var noteId = null;

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should POST a new note to be tested', function(done) {
    chai.request('localhost:8888')
      .post('/note')
      .send({name:'test', species:'test', location:'test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test');
        noteId = res.body._id;
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should GET the notes', function(done) {
    chai.request('localhost:8888')
        .get('/note')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          done();
        });
    });

  describe('new note for test', function() {
    beforeEach(function(done) {
      var testNote = new Note({name: 'test note'});
      testNote.save(function(err, data) {
        if(err) throw err;
        this.testNote = data;
        done();
      }.bind(this));
    });

  it('should update an note', function(done) {
      var id = this.testNote._id;
      chai.request('localhost:8888')
          .put('/note' + id)
          .send({name: 'here is a new note'})
          .end(function(err, res) {
        expect(err).to.eql(null);
        done();
      });
    });
  });


  describe('404 route', function() {
    it('should 404 if you go to a bad path', function(done) {
      chai.request('localhost:8888')
          .get('/badbadbadroute')
          .end(function(err, res) {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            done();
          });
       });
    });
});
