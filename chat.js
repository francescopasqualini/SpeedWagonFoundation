/******* configs ********/
const classes = require('./classes') //file in cui ho definito db e Message
const Message = classes.Message
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
var db = classes.db

app.use(bodyParser.json()) 
app.listen(port, function () {
    console.log('Listening at http://localhost:' + port)
})

const MessageTypes = ['text', 'image', 'voicemail', 'video']
var badFormed = { error: "request bad formed" }
var notFound = { error: "id not found" }
var serverError = { error: "server error" }

/******** MIDDLEWARES  *********/

app.use('/chat/:idFrom/:idTo?/:idMessage?', function (req, res, next) {
    const idFrom = Number.parseInt(req.params.idFrom)
    const idTo = Number.parseInt(req.params.idTo)
    const idMessage = Number.parseInt(req.params.idMessage)
    
    let idFromCheck = Number.isInteger(idFrom)
    let idToCheck = (req.params.idTo == undefined) || (Number.isInteger(idTo))
    let idMessageCheck = (req.params.idMessage == undefined) || (Number.isInteger(idMessage))
    let sameCheck = idFrom != idTo
    let consistencyCheck = idFromCheck && idToCheck && idMessageCheck && sameCheck
    
    let isIdFromInDb = idFrom in utentiDatabase 
    let isIdToInDb = (req.params.idTo == undefined) || (idTo in utentiDatabase)
    let isInDbCheck = isIdFromInDb && isIdToInDb
    
    console.log("utentidb: " + Object.keys(utentiDatabase))

    if (consistencyCheck && isInDbCheck){
        res.locals.idFrom = idFrom 
        res.locals.idTo = idTo 
        res.locals.idMessage = idMessage 
        next()
    }else if(!consistencyCheck){
        res.status(400).json(badFormed)
    }else{
        console.log(isIdFromInDb + "  " + isIdToInDb)
        res.status(404).json(notFound)
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
        res.status(404).json(notFound)
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
        res.status(404).json(notFound)
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
            res.status(500).json(serverError)
        }
    }else{
        res.status(400).json(badFormed)
    }
})

//post a message (user to all)
app.post('/chat/:idFrom', function (req, res) {
    const idFrom = res.locals.idFrom
    let body = req.body
    if (body && body.content && MessageTypes.includes(body.type)){
        let success = true
        Object.keys(utentiDatabase).forEach(function (user) {
            if (user != idFrom) {
                let message = new Message(body.type, idFrom, user, body.content)
                success = db.sendMessage(idFrom, user, message) && success
            }
        })
        if (success){
            res.status(201).send()
        }else {
            res.status(500).json(serverError)
        }
    }else {
        res.status(400).json(badFormed)
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
        res.status(404).json(notFound)
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
            res.status(404).json(notFound)
        }
    } else {
        res.status(400).json(badFormed)
    }
})

