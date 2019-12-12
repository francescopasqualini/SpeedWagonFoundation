/******* configs ********/
const classes = require('./classes') //file in cui ho definito Db e Message
const Db = classes.Db
const Message = classes.Message
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(bodyParser.json()) 
app.listen(port, function () {
    console.log('Listening at http://localhost:' + port)
})


const MessageTypes = ['text', 'image', 'voicemail', 'video']
var db = new Db()

/******** MIDDLEWARES  *********/

app.use('/chat/:idFrom/:idTo?/:idMessage?', function (req, res, next) {
    const idFrom = Number.parseInt(req.params.idFrom)
    const idTo = Number.parseInt(req.params.idTo)
    const idMessage = Number.parseInt(req.params.idMessage)
    
    let idFromCheck = Number.isInteger(idFrom)
    let idToCheck = req.params.idTo == undefined ? true : Number.isInteger(idTo)
    let idMessageCheck = req.params.idMessage == undefined ? true : Number.isInteger(idMessage)
    let sameCheck = idFrom != idTo
    /** inserire qui il check che gli utenti siano esistenti */

    if (idFromCheck && idToCheck && idMessageCheck && sameCheck){
        res.locals.idFrom = idFrom 
        res.locals.idTo = idTo 
        res.locals.idMessage = idMessage 
        next()
    }else{
        res.status(400).send()
    }
});

app.use('/chat/:idFrom/:idTo?/:idMessage?', function (req, res, next) {
    console.log(`${req.method} : ${req.originalUrl}`)
    next()
})


/******** APIs  ********/

/* Retrieve the whole dbchat. For testing purposes*/ 
app.get('/chat', function (req, res) {
   res.status(200)
   res.json(db.dbchat) 
})

//get a message
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

//get a chat
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

//post a message (user to user)
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

//post a message (user to all)
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

