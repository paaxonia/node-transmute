var expect = require('chai').expect;
var transmute = require('../index.js');

describe('Transmute', function () {
  var person1, person2, transmuter;

  before(function () {
    person1 = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      city: 'New York'
    };

    person2 = {
      id: 2,
      firstname: 'Jane',
      lastname: 'Doe',
      city: 'Los Angeles'
    };

    transmuter = function(person) {
      return {
        id: person.id,
        name: person.firstname + ' ' + person.lastname,
        location: {
          city: person.city
        }
      };
    };
  });

  describe('one', function () {

    it('should transmute one item', function (done) {
      transmute.one(person1, transmuter, function (err, result) {
        expect(result).to.have.all.keys(['id', 'name', 'location']);
        done();
      });
    });

    it('should throw an error if transmuter is not a function', function (done) {
      transmute.one(person1, undefined, function (err, result) {
        expect(err).to.exist.and.be.instanceof(Error);
        done();
      });
    });
  });

  describe('collection', function () {
    var persons;

    before(function () {
      persons = [person1, person2];
    });

    it('should transmute a collection of items', function (done) {
      transmute.collection(persons, transmuter, function (err, result) {
        expect(result.length).to.eql(2);
        done();
      });
    });

    it('should throw an error if transmuter is not a function', function (done) {
      transmute.collection(persons, undefined, function (err, result) {
        expect(err).to.exist.and.be.instanceof(Error);
        done();
      });
    });
  });

});
