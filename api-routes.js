const jwt = require('jsonwebtoken');
const jwtSecret = 'majkabozjabistricka';
const { PeopleDBRepository } = require('./people-db-repository');
const { Router } = require('@awaitjs/express');
const router = Router();
const dbRepo = new PeopleDBRepository();

router.useAsync(async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtSecret);
    const user = await dbRepo.getById(decoded.user_id);
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
router.getAsync('/people', async (req, res) => {
  const people = await dbRepo.getAll();
  for (const person of people) {
    delete person.password;
  }
  res.send(people);
});
//Get person by ID
router.getAsync('/people/:id', async (req, res) => {
  const person = await dbRepo.getById(parseInt(req.params.id));
  delete person.password;
  res.send(person);
});
//Add new person
router.postAsync('/people', async (req, res) => {
  const response = await dbRepo.create(req.body);
  res.send(response);
});
//Delete person
router.deleteAsync('/people/:id', loggedIn, async (req, res) => {
  await dbRepo.delete(parseInt(req.params.id));
  res.send();
});
//Edit person
router.putAsync('/people/:id', loggedIn, async (req, res) => {
  const person = {
    ...req.body,
    id: parseInt(req.params.id),
  };
  const newPerson = await dbRepo.update(person);
  delete newPerson.password;
  res.send(newPerson);
});
router.postAsync('/login', async (req, res) => {
  const { username, password } = req.body;
  const people = await dbRepo.getAll();
  console.log('people', people);
  const person = people.find((user) => user.username === username);
  if (person?.password === password) {
    //correct login
    const token = { user_id: person.id };
    res.send({ token: jwt.sign(token, jwtSecret) });
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
