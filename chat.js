const classes = require('./classes')
const Db = classes.Db
const Message = classes.Message

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

var db = new Db()

const MessageTypes = ['text', 'image', 'voicemail', 'video']

app.use(bodyParser.json()) 

app.listen(port, function () {
    console.log('Listening at http://localhost:' + port)
})

app.use('/chat/:idFrom/:idTo?/:idMessage?', function (req, res, next) {
    
    const idFrom = Number.parseInt(req.params.idFrom)
    const idTo = Number.parseInt(req.params.idTo)
    const idMessage = Number.parseInt(req.params.idMessage)
    
    let idCheck = Number.isInteger(idFrom) && (!idTo || Number.isInteger(idTo))
    let messageCheck = idMessage ? Number.isInteger(idMessage) : true

    if (idCheck && messageCheck){
        res.locals.idFrom = idFrom 
        res.locals.idTo = idTo 
        res.locals.idMessage = idMessage 
        next()
    }else{
        res.status(400).send()
    }
});

//logger
app.use('/chat/:idFrom/:idTo?/:idMessage?', function (req, res, next) {
    console.log(`${req.method} : ${req.originalUrl}`)
    next()
})


//apis

app.get('/chat', function (req, res) {
   res.status(200)
   res.json(db) 
})

//ottiene un messaggio
app.get('/chat/:idFrom/:idTo/:idMessage', function(req, res){
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    const idMessage = res.locals.idMessage
    let message = db.retrieveMessage(idFrom, idTo, idMessage)
    if (message){
        res.status(200).json(message)
    }else{
        res.status(404).send()
    }
    
})

//ottiene una chat
app.get('/chat/:idFrom/:idTo', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    let chat = db.retrieveChat(idFrom, idTo)
    if (chat){
        res.status(200).json(chat)
    }else{
        res.status(404).send()
    }
    
})

//send a message
app.post('/chat/:idFrom/:idTo', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    let body = req.body
    if (body && body.content && MessageTypes.includes(body.type)){
        let message = new Message(body.type, idFrom, idTo, body.content)
        if (db.sendMessage(idFrom, idTo, message)){
            res.status(201).send()
        }else {
            res.status(500).send()
        }
    }else{
        res.status(400).send()
    }
})

//send a message to All
app.post('/chat/:idFrom', function (req, res) {
    const idFrom = res.locals.idFrom
    let body = req.body
    if (body && body.content && MessageTypes.includes(body.type)){
        let success = true
        db.dbchat.users.forEach(function (user) {
            if (user != idFrom) {
                let message = new Message(body.type, idFrom, user, body.content)
                success = db.sendMessage(idFrom, user, message) && success
            }
        })
        if (success){
            res.status(201).send()
        }else {
            res.status(500).send()
        }
    }else {
        res.status(400).send()
    }
})

//delete a message
app.delete('/chat/:idFrom/:idTo/:idMessage', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    const idMessage = res.locals.idMessage
    if (db.deleteMessage(idFrom, idTo, idMessage)) {
        res.status(204).send()
    }else{
        res.status(404).send()
    }
})

//edit a message
app.put('/chat/:idFrom/:idTo/:idMessage', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    const idMessage = res.locals.idMessage
    let body = req.body
    if (body && body.content){
        body.id = idMessage
        if (db.editMessage(idFrom, idTo, body)){
            res.status(204).send()
        }else{
            res.status(404).send()
        }
    } else {
        res.status(400).send()
    }
})

