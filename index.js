const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const {PeopleRepository} = require('./people-repository');


const repo = new PeopleRepository();

app.get('/', (req, res) => {
  res.redirect('/people');
})
app.get('/api/people', (req, res)=>{
  res.send(repo.getAll());
})
app.get('/api/people/new', (req,res) => {
  const person = {name:req.query.name, last_name:req.query.last_name, oib:req.query.oib};
  repo.create(person);
  res.send("Successfully done!");
})
app.get('/people/new', (req, res) =>{
  res.send(fs.readFileSync('form.html', 'utf-8'));
})
app.get('/people', (req, res) =>{
  res.send(fs.readFileSync('people-table.html', 'utf8'));

})
app.get('/api/people/delete', (req, res) =>{
  repo.delete(parseInt(req.query.id));
  res.send("Successfully deleted record!");
})
app.get('/api/people/edit', (req, res) =>{
  const person = {id:parseInt(req.query.id), name:req.query.name, last_name:req.query.last_name, oib:req.query.oib};
  repo.edit(person);
  res.send("Successfully edited the record.");
})
app.get('/api/people/:id', (req, res) =>{
  res.send(repo.getById(parseInt(req.params.id)));
})
app.get('/people/edit', (req, res) => {
  res.send(fs.readFileSync('form.html', 'utf8'));
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})