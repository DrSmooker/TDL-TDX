const http = require('http')
const { register,login, reminders, delReminders } = require('./controllers/controller.js')




const server = http.createServer((req,res) => {
    if(req.url === '/api/register' && req.method==='POST'){ //POST - WORKS
        register(res,'Hello22', 'Hola1213')
    }
    else if(req.url === '/api/login' && req.method==='POST'){ //POST - WORKS
        login(res,'Hello22', 'Hola1213')
    }
    else if(req.url === '/api/reminders' && req.method==='GET'){ //GET
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({/*JSON to SQL*/}))
    }
    else if(req.url === '/api/reminders' && req.method==='POST'){ // POST
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({/*JSON to SQL*/}))
    }
    else if(req.url === ' /api/reminders/{id}' && req.method==='PUT'){ //PUT
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({/*JSON to SQL*/}))
    }
    else if(req.url === ' /api/reminders/{id}' && req.method==='DELETE'){ //DELETE
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({/*JSON to SQL*/}))
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'ERROR 404: Page not found'}))
    }
    

})

const PORT = process.env.PORT || 1337

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))