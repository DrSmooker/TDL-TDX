const http = require('http')

const { register,login, reminders, createReminder, updateReminder, deleteReminder } = require('./controllers/controller.js')




const server = http.createServer((req,res) => {
    //document.cookie = 'name=alice; Max age = 5 '
    //res.setHeader('Set-Cookie', ['age=16;max-age=20000'])
    if(req.url === '/api/register' && req.method==='POST'){ //POST - WORKS
        register(res,'Hello22', 'Hola1213') //Couldn't access data from frontend
    }
    else if(req.url === '/api/login'){ //POST - WORKS
        login(res,'Hello22', 'Hola1213')//Couldn't access data from frontend
    }
    else if(req.url === '/api/reminders' && req.method==='GET'){ //GET
        reminders(res)
        
    }
    else if(req.url === '/api/reminders' && req.method==='POST'){ // POST
        createReminder(res,"Take my husband","From school at 6PM") //Gotta make it a foreign key for Users
    }
    else if(req.url === ' /api/reminders/{id}' && req.method==='PUT'){ //PUT
        updateReminder(res,id,"Updated","Reminder" ) //can't access id number from URL
    }
    else if(req.url === ' /api/reminders/{id}' && req.method==='DELETE'){ //DELETE
        deleteReminder(res,id) //can't access id number from URL
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'ERROR 404: Page not found'}))
    }
    

})

const PORT = process.env.PORT || 1337

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))