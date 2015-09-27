# Transmute

[![Build Status](https://travis-ci.org/paaxonia/node-transmute.svg?branch=master)](https://travis-ci.org/paaxonia/node-transmute)
[![Coverage Status](https://coveralls.io/repos/paaxonia/node-transmute/badge.svg?branch=master&service=github)](https://coveralls.io/github/paaxonia/node-transmute?branch=master)

A simple library to transmute data into new forms.

- Transmutes single items.
- Transmutes a collection of items.

## Installing transmute

The package is available at [npm](http://npmjs.org) and can be installed by doing:

```
npm install node-transmute
```

## How to use transmute

First load the transmute module and define a transmuter function.

```javascript
  var transmute = require('node-transmute');

  function personTransmuter(person, callback) {
    var transmuted = {
      id: person.id,
      name: person.firstname + ' ' + person.lastname,
      location: {
        city: person.city
      }
    };
    
    callback(null, transmuted);
  }
```

**Transmuting a single item**

```javascript
  var person = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    city: 'New York'
  };
  
  transmute.one(person, personTransmuter, function (err, result) {
    console.log(result);
  });
```

**Transmuting a collection of items**

```javascript
  var persons = [
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      city: 'New York'
    },
    {
      id: 2,
      firstname: 'Jane',
      lastname: 'Doe',
      city: 'Los Angeles'
    }
  ];
  
  transmute.collection(persons, personTransmuter, function (err, result) {
    console.log(result);
  });
```
