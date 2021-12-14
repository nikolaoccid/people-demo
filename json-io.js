const fs = require('fs');

function readJSON(filename) {
  const file = fs.readFileSync(filename, 'utf8');
  return JSON.parse(file);
}

function writeJSON(filename, data) {
  const serializedData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filename, serializedData);
}

exports.readJSON = readJSON;
exports.writeJSON = writeJSON;
