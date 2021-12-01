const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.redirect('/people');
})
app.get('/api/people', (req, res)=>{
  const peopleString = fs.readFileSync('people.json', 'utf8');
  res.send(peopleString);
})
app.get('/api/people/new', (req,res) => {
  const name= req.query.name;
  const lastName = req.query.last_name;
  const oib = req.query.oib;
  const peopleString = fs.readFileSync('people.json', 'utf8');
  const people = JSON.parse(peopleString);
  const id = people.slice(-1)[0].id + 1;
  people.push({id: id, name: name, last_name: lastName, oib: oib});
  const newPeopleString = JSON.stringify(people, null, 2);
  fs.writeFileSync('people.json', newPeopleString) ;
  res.send("Successfully done!");
})
app.get('/people/new', (req, res) =>{
  const formHTML= fs.readFileSync('form.html', 'utf-8');
  res.send(formHTML);
})
app.get('/people', (req, res) =>{
  const peopleTableHTML = fs.readFileSync('people-table.html', 'utf8');
  res.send(peopleTableHTML);

})
app.get('/api/people/delete', (req, res) =>{
  const id = parseInt(req.query.id);
  const peopleString = fs.readFileSync('people.json', 'utf8');
  const people = JSON.parse(peopleString);
  const newPeople = people.filter(item => item.id !== id)
  const newPeopleString = JSON.stringify(newPeople, null, 2);
  fs.writeFileSync('people.json', newPeopleString);
  res.send("Successfully deleted record!");

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})