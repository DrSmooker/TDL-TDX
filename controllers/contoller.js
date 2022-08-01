const DB = require('./models/dbServer')
DB.sendRegistrationDb()

con.connect
async function register(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({/*JSON to SQL*/}))
}