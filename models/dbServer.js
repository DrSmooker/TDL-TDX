const mysql = require("mysql")
var http = require('https');

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT


const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,       
   user: 'Admin',         
   password: 'Admin',  
   database: 'todo',      
   port: 3306             
})

const user='Roanb'
const pass='WTFaaad#$%Gds'

async function sendRegistrationDb(username, password){
   db.getConnection( (err, connection) => {
      if (err) throw (err)
      
      /*SQL query to search for user in DB*/
      const sqlSearch = "SELECT * FROM Users WHERE username = ?"
      const search_query = mysql.format(sqlSearch,[user])
      /*SQL query to insert user to DB*/
      const sqlInsert = "INSERT INTO Users (username, password_hash) VALUES (?,?)"
      const insert_query = mysql.format(sqlInsert,[username, password])
      
      /*Check if user already exists*/
      db.query (search_query, async (err, result) => {
         if (err) throw (err)
         console.log("------> Search Results")
         console.log(result.length)
         if (result.length != 0) {
          connection.release()
          console.log("------> User already exists")
          return 409 //HTTP code
         } 
         else{/*Insert into DB*/
            db.query(insert_query, async (err, result) => {
               connection.release()
               if (err) throw err
               console.log ("--------> Created new User")
               console.log(result.insertId)
               return 201 //HTTP code
            })
         }
      })
      
      
   })
   
}

module.exports = {
   sendRegistrationDb
}


