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

  conn.query(`SELECT * FROM users;`, function(err, rows) {
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


// GET /tickets
app.get('/tickets', function (req, res) {
  console.log('GET /tickets: ezt kapta a szerver:');
  console.log('req.method, req.url, req.query: ', req.method, req.url, req.query);

  if (req.url === '/tickets') {
    console.log('if');
    conn.query(`SELECT * FROM tickets;`, function(err, rows) {
      if(err) {
        console.log(err.toString());
        res.satus(500).send('Database error');
        return;
      }
      res.status(200);
      res.json(rows);
      // console.log(rows);
    });
  }else if (req.query.reporter && req.query.manufacturer) {
    console.log('else if reporter && manufacturer');
    conn.query(`SELECT * FROM tickets WHERE reporter = ? AND manufacturer = ?;`, [req.query.reporter, req.query.manufacturer], function(err, rows) {
      if(err) {
        console.log(err.toString());
        res.satus(500).send('Database error');
        return;
      }
      res.status(200);
      res.json(rows);
      // console.log(rows);
    });
  } else if (req.query.manufacturer) {
    console.log('else if manufacturer');
    conn.query(`SELECT * FROM tickets WHERE manufacturer = ?;`, [req.query.manufacturer], function(err, rows) {
      if(err) {
        console.log(err.toString());
        res.satus(500).send('Database error');
        return;
      }
      res.status(200);
      res.json(rows);
      // console.log(rows);
    });
  } else if (req.query.reporter) {
    console.log('else if reporter');
    conn.query(`SELECT * FROM tickets WHERE reporter = ?;`, [req.query.reporter], function(err, rows) {
      if(err) {
        console.log(err.toString());
        res.satus(500).send('Database error');
        return;
      }
      res.status(200);
      res.json(rows);
      // console.log(rows);
    });
  } 
});


// POST /tickets
app.post('/tickets', function (req, res) {
  console.log('POST /tickets: ezt kapta a szerver:', req.params);
  console.log('req.method, req.url, req.query, (req.body:)', req.method, req.url, req.params);

  let success = {"result": "success"};
  let notValid = {"result": "not a valid ticket"};
  let errr = {"result": "error"};

  const ticket = req.body;
  console.log('ticket:', ticket);

  // VALIDATE & CREATE TICKET
  function createTicket(ticket) {
    if (ticket.reporter !== '' && ticket.manufacturer !== '' && ticket.serial_number !== '' && ticket.description !== '') {
      conn.query(`INSERT INTO tickets (reporter, manufacturer, serial_number, description, reported_at) VALUES ('?', '?', '?', '?', '?');`
      [ticket.reporter, ticket.manufacturer, ticket.serial_number, ticket.description, '2018-02-13'], function(err,rows) {
        if(err) {
          console.log(err.toString());
          res.satus(500);
          res.send('Database error');
          return;
        }
        conn.query(`SELECT * FROM tickets ORDER BY id ASC LIMIT 1;`, function(err, rows) {
          if(err) {
            console.log(err.toString());
            res.satus(500);
            re.send('Database error');
            return;
          }
          res.status(200);
          res.json(rows);
          // console.log(rows);
        });
      });
    } else {
      res.status(400);
      res.json(notValid);
    }
  }

  createTicket(ticket);

});


app.listen(PORT, function() {
  console.log(`The server is running & listening on ${PORT}`);
});
