const { Client } = require('pg');
const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'people-demo',
  password: '1234',
  port: 5402,
});
client.connect();

class PeopleDBRepository {
  async getAll() {
    const res = await client.query('select * from people');
    return res.rows;
  }
  async create(person) {
    const text =
      'insert into people(name, last_name, oib, username, password) values($1, $2, $3, $4, $5) returning *';
    const values = [
      person.name,
      person.last_name,
      person.oib,
      person.username,
      person.password,
    ];
    const res = await client.query(text, values);
    return res.rows[0];
  }
  async getById(id) {
    const text = 'select * from people where id=$1';
    const values = [id];
    const res = await client.query(text, values);
    return res.rows[0];
  }

  async update({ id, name, last_name, oib, username, password }) {
    const text = `update people set name=$1, last_name=$2, oib=$3, username=$4 ${
      password ? ',password=$6' : ''
    } where id = $5 returning *`;

    const values = [name, last_name, oib, username, id, password];
    if (!password) {
      values.pop();
    }
    const response = await client.query(text, values);
    return response.rows[0];
  }
}
exports.PeopleDBRepository = PeopleDBRepository;
