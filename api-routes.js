const express = require('express');
const { PeopleRepository } = require('./people-repository');
const jwt = require('jsonwebtoken');

const router = express.Router();
const repo = new PeopleRepository();

router.use((req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'majkabozjabistricka');
    const user = repo.getById(decoded.user_id);
    delete user.password;
    req.user = user;
  } catch {}
  next();
});
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401);
    res.send({ error: 'Not authorized.' });
  }
}

//Get all people
router.get('/people', (req, res) => {
  const people = repo.getAll();
  for (const person of people) {
    delete person.password;
  }
  res.send(people);
});
//Get person by ID
router.get('/people/:id', (req, res) => {
  const person = repo.getById(parseInt(req.params.id));
  delete person.password;
  res.send(person);
});
//Add new person
router.post('/people', (req, res) => {
  const person = {
    name: req.body.name,
    last_name: req.body.last_name,
    oib: req.body.oib,
    username: req.body.username,
    password: req.body.password,
  };
  res.send(repo.create(person));
});
//Delete person
router.delete('/people/:id', loggedIn, (req, res) => {
  repo.delete(parseInt(req.params.id));
  res.send();
});
//Edit person
router.put('/people/:id', loggedIn, (req, res) => {
  const person = {
    id: parseInt(req.params.id),
    name: req.body.name,
    last_name: req.body.last_name,
    oib: req.body.oib,
    username: req.body.username,
    password: req.body.password,
  };
  const newPerson = repo.update(person);
  delete newPerson.password;
  res.send(newPerson);
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
router.get('/me', loggedIn, (req, res) => {
  const { user } = req;
  res.send(user);
});
exports.router = router;
