'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

var Note = require('../../note.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/restAPI';
// require('./app/');

process.env.PORT = 8889;

chai.use(chaihttp);

require('../../server');

describe('app', function() {
  var noteId = null;

  this.timeout(5000);

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should POST a new note to be tested', function(done) {
    chai.request('localhost:8889')
      .post('/api/note')
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
    chai.request('localhost:8889')
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
      chai.request('localhost:8889')
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
      chai.request('localhost:8889')
          .get('/badbadbadroute')
          .end(function(err, res) {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            done();
          });
       });
    });
});
