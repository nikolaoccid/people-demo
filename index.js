const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const io = require('./json-io')

app.get('/', (req, res) => {
  res.redirect('/people');
})
app.get('/api/people', (req, res)=>{
  res.send(io.readJSON('people.json'));
})
app.get('/api/people/new', (req,res) => {
  const name= req.query.name;
  const lastName = req.query.last_name;
  const oib = req.query.oib;
  const people = io.readJSON('people.json');
  const id = people.slice(-1)[0].id + 1;
  people.push({id: id, name: name, last_name: lastName, oib: oib});
  io.writeJSON('people.json', people);
  res.send("Successfully done!");
})
app.get('/people/new', (req, res) =>{
  res.send(fs.readFileSync('form.html', 'utf-8'));
})
app.get('/people', (req, res) =>{
  res.send(fs.readFileSync('people-table.html', 'utf8'));

})
app.get('/api/people/delete', (req, res) =>{
  const id = parseInt(req.query.id);
  const people = io.readJSON('people.json');
  const newPeople = people.filter(item => item.id !== id)
  io.writeJSON('people.json', newPeople);
  res.send("Successfully deleted record!");
})
app.get('/api/people/edit', (req, res) =>{
  const id = parseInt(req.query.id);
  const name = req.query.name;
  const lastName = req.query.last_name;
  const oib = req.query.oib;
  const people = io.readJSON('people.json');
  const index = people.findIndex(person => person.id === id);
  people[index].name = name;
  people[index].last_name = lastName;
  people[index].oib = oib;
  io.writeJSON('people.json', people);
  res.send("Successfully edited the record.");
})
app.get('/api/people/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const people = io.readJSON('people.json');
  const person = people.find(person => person.id === id);
  res.send(person);
})
app.get('/people/edit', (req, res) => {
  res.send(fs.readFileSync('form.html', 'utf8'));
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})