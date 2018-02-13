'use strict';

const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/assets', express.static('assets'));

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'gfuser',
  password: '1cMXL38gVbry$8wV',
  database: 'orientation_retake',
});

// GET index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/notebook-index.html');
});


// GET /users
app.get('/users', function (req, res) {
  console.log('GET /users: ezt kapta a szerver:');
  console.log('req.method, req.url: ', req.method, req.url);

  conn.query(`SELECT name FROM users;`, function(err, rows) {
    if(err) {
      console.log(err.toString());
      res.satus(500).send('Database error');
      return;
    }
    res.status(200);
    res.json(rows);
    // console.log(rows);
  });
});



app.listen(PORT, function() {
  console.log(`The server is running & listening on ${PORT}`);
});
