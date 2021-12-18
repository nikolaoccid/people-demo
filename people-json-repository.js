const io = require('./json-io');

class PeopleJSONRepository {
  getAll() {
    return io.readJSON('people.json');
  }
  create(person) {
    const people = io.readJSON('people.json');
    let lastPerson = people.slice(-1)[0];
    const newPerson = {
      id: lastPerson ? lastPerson.id + 1 : 1,
      name: person.name,
      last_name: person.last_name,
      oib: person.oib,
      username: person.username,
      password: person.password,
    };
    people.push(newPerson);
    io.writeJSON('people.json', people);
    return newPerson;
  }
  delete(id) {
    const people = io.readJSON('people.json');
    const newPeople = people.filter((item) => item.id !== id);
    io.writeJSON('people.json', newPeople);
  }
  update(newPerson) {
    const id = newPerson.id;
    const name = newPerson.name;
    const lastName = newPerson.last_name;
    const oib = newPerson.oib;
    const username = newPerson.username;
    const people = io.readJSON('people.json');
    const index = people.findIndex((person) => person.id === id);
    people[index].name = name;
    people[index].last_name = lastName;
    people[index].oib = oib;
    people[index].username = username;
    if (newPerson.password) {
      people[index].password = newPerson.password;
    }
    io.writeJSON('people.json', people);
    return people[index];
  }
  getById(id) {
    const people = io.readJSON('people.json');
    return people.find((person) => person.id === id);
  }
}
exports.PeopleJSONRepository = PeopleJSONRepository;
