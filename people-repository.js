const io = require('./json-io');

class PeopleRepository {
  getAll(){
    return io.readJSON('people.json');
  }
  create(person){
    const people = io.readJSON('people.json');
    const id = people.slice(-1)[0].id + 1;
    people.push({id: id, name: person.name, last_name: person.last_name, oib: person.oib});
    io.writeJSON('people.json', people);
  }
  delete(id){
    const parsedId = id;
    const people = io.readJSON('people.json');
    const newPeople = people.filter(item => item.id !== parsedId);
    io.writeJSON('people.json', newPeople);
  }
  edit(newPerson){
    const id = newPerson.id;
    const name = newPerson.name;
    const lastName = newPerson.last_name;
    const oib = newPerson.oib;
    const people = io.readJSON('people.json');
    const index = people.findIndex(person => person.id === id);
    people[index].name = name;
    people[index].last_name = lastName;
    people[index].oib = oib;
    io.writeJSON('people.json', people);
  }
  getPersonById(id){
    const people = io.readJSON('people.json');
    return people.find(person => person.id === id);
  }
}
exports.PeopleRepository = PeopleRepository;