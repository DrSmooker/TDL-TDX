const mysql = require("mysql")
require("dotenv").config()
var http = require('https');

const db = mysql.createPool({
   connectionLimit: 100,
   host: "127.0.0.1",       
   user: "Admin",         
   password: "Admin",  
   database: "todo",      
   port: "3306"             
})
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

//create a server object:
const port = process.env.PORT
http.createServer(function (req, res) {
  res.write('Server Started on port ${port}...'); //write a response to the client
  res.end(); //end the response
}).listen(port); //the server object listens on port 8080







/*const mysql = require("mysql")




const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})*/






