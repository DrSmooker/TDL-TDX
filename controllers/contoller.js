const DB = require('../models/dbServer')

const register = DB.sendRegistrationDb(user,pass)


async function register(req, res) {
    try{
        
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({/*JSON to SQL*/}))
    }catch(error){
        console.log(error)
    }
    
}