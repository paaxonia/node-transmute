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

    it('should transmute one item', function () {
      transmute.one(person1, transmuter, function (err, person) {
        expect(person).to.have.all.keys(['id', 'name', 'location']);
      });
    });

    it('should throw an error if transmuter is not a function', function () {
      transmute.one(person1, undefined, function (err, person) {
        expect(err).to.exist.and.be.instanceof(Error);
      });
    });
  });

  describe('collection', function () {
    var persons;

    before(function () {
      persons = [person1, person2];
    });

    it('should transmute a collection of item', function () {
      transmute.collection(persons, transmuter, function (err, persons) {
        expect(persons.length).to.eql(2);
      });
    });

    it('should throw an error if transmuter is not a function', function () {
      transmute.one(persons, undefined, function (err, person) {
        expect(err).to.exist.and.be.instanceof(Error);
      });
    });
  });

});
