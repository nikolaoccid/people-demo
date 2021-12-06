const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {router} = require('./api-routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public', {extensions: ['html']}));

app.get('/', (req, res) => {
  res.redirect('/people');
})

app.get('/people/new', (req, res) =>{
  res.send(fs.readFileSync('form.html', 'utf-8'));
})
app.get('/people/edit', (req, res) => {
  res.send(fs.readFileSync('form.html', 'utf8'));
})

app.use('/api', router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
