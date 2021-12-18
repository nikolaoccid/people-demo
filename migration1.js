const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function queryDB() {
  await client.connect();
  const sql = `create table if not exists people (
    id serial primary key ,
    name text not null ,
    last_name text not null,
    oib text not null unique,
    username text not null unique,
    password text not null
)`;
  await client.query(sql);
  try {
    await client.query(`
    insert into people (name, last_name, oib, username, password)
    values ('Jane', 'Doe', '1234567', 'demo', 'demo')
`);
  } catch {}
  await client.end();
}
queryDB().catch((err) => {
  console.error(err);
  process.exit(-1);
});
