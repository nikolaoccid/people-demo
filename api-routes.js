const express = require('express');
const {PeopleRepository} = require('./people-repository');

const router = express.Router();
const repo = new PeopleRepository();


//Get all people
router.get('/people', (req, res)=>{
  res.send(repo.getAll());
})
//Get person by ID
router.get('/people/:id', (req, res) =>{
  res.send(repo.getById(parseInt(req.params.id)));
})
//Add new person
router.post('/people', (req, res) => {
  const person = {name:req.body.name, last_name:req.body.last_name, oib:req.body.oib};
  res.send(repo.create(person));
})
//Delete person
router.delete('/people/:id', (req, res) => {
  repo.delete(parseInt(req.params.id));
  res.send();
})
//Edit person
router.put('/people/:id', (req, res) => {
  const person = {id:parseInt(req.params.id), name:req.body.name, last_name:req.body.last_name, oib:req.body.oib};
  res.send(repo.edit(person));
})
exports.router = router;

