const DB = require('../models/dbServer')



// @desc    Register a user
// @route   POST /api/register
async function register(res,user,pass) {
    try{
        DB.sendRegistrationDb(user,pass)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Account created!' }))
    }catch(error){
        console.log(error)
    }
    
}

// @desc    Authenticate a user
// @route   POST /api/login
async function login(res,user,pass) {
    try{
        DB.sendLoginDb(user,pass)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Logged in successfuly!' }))
    }catch(error){
        console.log(error)
    }
    
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
async function reminders(res) {
    try{
        DB.sendRemindersDb()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Logged in successfuly!' }))
    }catch(error){
        console.log(error)
    }
    
}

// @desc    Update a reminder
// @route   POST /api/reminders/:id
async function reminders(res,id) {
    try{
        DB.sendRemindersDb(id)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Logged in successfuly!' }))
    }catch(error){
        console.log(error)
    }
    
}

// @desc    Delete a reminder
// @route   DELETE /api/reminders/:id
async function reminders(res,id) {
    try{
        DB.sendRemindersDb(user,pass)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Logged in successfuly!' }))
    }catch(error){
        console.log(error)
    }
    
}
