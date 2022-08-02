const DB = require('../models/dbServer')
const fs = require('fs');



// @desc    Register a user
// @route   POST /api/register
async function register(res,user,pass) {
    fs.readFile('./frontend/register.html', function (err,html){
        if(err){
            throw err
        }
        DB.sendRegistrationDb(user,pass)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(html)
        res.end()
   
    })
}

// @desc    Authenticate a user
// @route   POST /api/login
async function login(res,user,pass) {
    fs.readFile('./frontend/login.html', function (err,html){
        if(err){
            throw err
        }
        DB.sendLoginDb(user,pass)
        res.writeHead(200, { 'Content-Type': 'text/html','Set-Cookie':`${user}`+'='+makeCookie()+'; expires='+new Date(new Date().getTime()+86409000).toUTCString() })
        res.write(html)
        res.end()
        
    })
    
        
    
    
}

// @desc    Get all user's reminders
// @route   GET /api/reminders
async function reminders(res) {
    try{
        DB.getRemindersDb()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Got all reminders!' }))
    }catch(error){
        console.log(error)
    }
    
}

// @desc    Create a new reminder
// @route   POST /api/reminders
async function createReminder(res,title,description) {
    try{
        DB.sendRemindersDb(title,description)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Logged in successfuly!' }))
    }catch(error){
        console.log(error)
    }
    
}

// @desc    Update a reminder
// @route   POST /api/reminders/:id
async function updateReminder(res,id) {
    try{
        DB.updateRemindersDb(id,title,description)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Updated successfuly!' }))
    }catch(error){
        console.log(error)
    }
    
}

// @desc    Delete a reminder
// @route   DELETE /api/reminders/:id
async function deleteReminder(res,id) {
    try{
        DB.deleteRemindersDb(id)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Deleted successfuly!' }))
    }catch(error){
        console.log(error)
    }
    
}

function makeCookie() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = 25;
    for ( var i = 0; i < 25; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = {
    register,
    login,
    reminders,
    createReminder,
    updateReminder,
    deleteReminder
    
}