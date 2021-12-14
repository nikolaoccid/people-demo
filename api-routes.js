const express = require('express');
const { PeopleRepository } = require('./people-repository');
const jwt = require('jsonwebtoken');

const router = express.Router();
const repo = new PeopleRepository();

//Get all people
router.get('/people', (req, res) => {
  res.send(repo.getAll());
});
//Get person by ID
router.get('/people/:id', (req, res) => {
  res.send(repo.getById(parseInt(req.params.id)));
});
//Add new person
router.post('/people', (req, res) => {
  const person = {
    name: req.body.name,
    last_name: req.body.last_name,
    oib: req.body.oib,
  };
  res.send(repo.create(person));
});
//Delete person
router.delete('/people/:id', (req, res) => {
  repo.delete(parseInt(req.params.id));
  res.send();
});
//Edit person
router.put('/people/:id', (req, res) => {
  const person = {
    id: parseInt(req.params.id),
    name: req.body.name,
    last_name: req.body.last_name,
    oib: req.body.oib,
  };
  res.send(repo.edit(person));
});
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const people = repo.getAll();
  const person = people.find((user) => user.username === username);
  if (person?.password === password) {
    //correct login
    const token = { user_id: person.id };
    res.send({ token: jwt.sign(token, 'majkabozjabistricka') });
  } else {
    res.status(401);
    res.send({ error: 'Invalid username or password.' });
  }
});
router.get('/me', (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, 'majkabozjabistricka');
    const user = repo.getById(decoded.user_id);
    delete user.password;
    res.send(user);
  } catch {
    res.status(401);
    res.send({ error: 'Invalid token.' });
  }
});
exports.router = router;
