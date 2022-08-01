const mysql = require("mysql")
var http = require('https');
var crypto = require('crypto');

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

/*connect to DB*/
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,       
   user: 'Admin',         
   password: 'Admin',  
   database: 'todo',      
   port: 3306             
})

/*A function that hashed a given password*/
async function hashPw(password){
   // Creating a unique salt for a particular user
   this.salt = 'Ron'.toString('hex')
  
   // Hashing user's salt and password with 1000 iterations,64 length and sha512 digest
   this.hash = crypto.pbkdf2Sync(password, salt, 1000, 25, `sha512`).toString(`hex`)
   return this.hash
}

async function sendRegistrationDb(username, password){
   hashedPassword=await hashPw(password) //Creates a promise which works only with await
   
   db.getConnection( (err, connection) => {
      if (err) throw (err)
      
      /*SQL query to search for user in DB*/
      const sqlSearch = "SELECT * FROM Users WHERE username = ?"
      const search_query = mysql.format(sqlSearch,[username])
      /*SQL query to insert user to DB*/
      const sqlInsert = "INSERT INTO Users (username, password_hash) VALUES (?,?)"
      const insert_query = mysql.format(sqlInsert,[username, hashedPassword])
      
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

async function sendLoginDb(username, password){
   hashedPasswordOrg=await hashPw(password)
   db.getConnection( (err, connection) => {
      if (err) throw (err)
      
      /*SQL query to search for user in DB*/
      const sqlSearch = "SELECT * FROM Users WHERE username = ?"
      const search_query = mysql.format(sqlSearch,[username])

      /*Check if user exists*/
      db.query (search_query, async (err, result) => {
         connection.release()
         if (err) throw (err)
         
         if (result.length == 0) {
          
          console.log("------> User doesn't exist")
          return 404 //HTTP code
         } 
         else{
            const hashedPasswordDb = result[0].password_hash //get the hashed password from result (the first existing user found)
            if(hashedPasswordDb == hashedPasswordOrg){
               console.log(`---------> ${username} Logged In Successfuly!`)
               return 201
            }
            else{
               console.log("---------> Password Incorrect")
               return 400
            }
         }
      })
   })
}

module.exports = {
   sendRegistrationDb,
   sendLoginDb,
   hashPw
}


