# Transmute

A simple library to transmute data into new forms.

- Transmutes single items.
- Transmutes collection of items.

## How to use transmute.

First load the transmute module and define a transmuter function.

```javascript
  var transmute = require('node-transmute');

  function personTransmuter(person) {
    return {
      id: person.id,
      name: person.firstname + ' ' + person.lastname,
      location: {
        city: person.city
      }
    };
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
