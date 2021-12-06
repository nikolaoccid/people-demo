const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const {PeopleRepository} = require('./people-repository');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public', {extensions: ['html']}));
const repo = new PeopleRepository();

app.get('/', (req, res) => {
  res.redirect('/people');
})

app.get('/people/new', (req, res) =>{
  res.send(fs.readFileSync('form.html', 'utf-8'));
})
app.get('/people/edit', (req, res) => {
  res.send(fs.readFileSync('form.html', 'utf8'));
})

//Get all people
app.get('/api/people', (req, res)=>{
  res.send(repo.getAll());
})
//Get person by ID
app.get('/api/people/:id', (req, res) =>{
  res.send(repo.getById(parseInt(req.params.id)));
})
//Add new person
app.post('/api/people', (req, res) => {
  const person = {name:req.body.name, last_name:req.body.last_name, oib:req.body.oib};
  res.send(repo.create(person));
})
//Delete person
app.delete('/api/people/:id', (req, res) => {
  repo.delete(parseInt(req.params.id));
  res.send();
})
//Edit person
app.put('/api/people/:id', (req, res) => {
  const person = {id:parseInt(req.params.id), name:req.body.name, last_name:req.body.last_name, oib:req.body.oib};
  res.send(repo.edit(person));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
