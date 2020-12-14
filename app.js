var express = require('express');
var bodyParser = require('body-parser')

const mysql = require('mysql');
const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "TP3Web",
	port: 3306
  });

var app = express();
var jsonParser = bodyParser.json()

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var errorDatabaseMessage = 'Error in database operation';

// Events
var events = [
{
	title: 'The Title',
	start: '2020-11-04',
	end: '2020-11-07'
},
{
	title: 'AquaTest',
	start: '2020-11-01',
	end: '2020-11-02'
},
{
	title: 'uwu',
	start: '2020-11-26',
	end: '2020-11-28'
}
]

app.get("/events", (req, res, next) => {
 	res.json(events);
});

app.get("/events/:userid", (req, res, next) => {
	con.query('select * from events where userid = ' + req.params.userid + ' ', function(error, results){
        if (error) {res.status(400).send(errorDatabaseMessage); } else {
            res.send(results);
        }
    });
});

app.put("/event", jsonParser, (req, res, next) => {
	console.log("New event : " + req.body.userid + " : " + req.body.title);
	con.query('insert into events(userid, title, start, end) values ("' + req.body.userid + '", "' + req.body.title + '", "' + req.body.start + '", "' + req.body.end + '")', function(error, results){
        if (error) {res.status(400).send(errorDatabaseMessage); } else {
            res.send(results);
        }
    });
});

app.delete("/event/:id", jsonParser, (req, res, next) => {
	con.query('delete from events where id =' + req.params.id + ' ', function(error, results){
        if (error) {res.status(400).send(errorDatabaseMessage); } else {
            res.send("ok");
        }
    });
});


// User
app.get("/users", (req, res, next) => {
	con.query('select * from users', function(error, results){
        if (error) {res.status(400).send(errorDatabaseMessage); } else {
            res.send(results);
        }
    });
});

app.get("/user/:id", (req, res, next) => {
	con.query('select * from users where id = "' + req.params.id + '"', function(error, results){
        if (error) {res.status(400).send(errorDatabaseMessage); } else {
            res.send(results);
        }
    });
});

app.put("/user", jsonParser, (req, res, next) => {
	console.log("New user : " + req.body.username + " : " + req.body.password);
	con.query('insert into users(username, password) values ("' + req.body.username + '", "' + req.body.password + '")', function(error, results){
        if (error) {res.status(400).send(errorDatabaseMessage); } else {
            res.send(results);
        }
    });
});

app.get("/user/checkpass/:username/:password", jsonParser, (req, res, next) => {
	console.log('select * from users where username = "' + req.params.username + '" and password = "' + req.params.password + '"');
	con.query('select * from users where username = "' + req.params.username + '" and password = "' + req.params.password + '"', function(error, results){
        if (error) {res.status(400).send(errorDatabaseMessage); } else {
            res.send(results);
        }
    });
});


// App
app.listen(3020, function() {
  console.log('Example app listening on port 3020!');
});

