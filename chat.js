const classes = require('./classes');
const Db = classes.Db;
const Message = classes.Message;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var db = new Db();

app.use(bodyParser.json()); 

app.listen(port, function () {
    console.log('Listening at http://localhost:' + port);
});

app.get('/chat', function (req, res) {
   res.status(200);
   res.send(db); 
});

app.get('/chat/:idFrom/:idTo/:idMessage', function(req, res){
    
    const idFrom = parseInt(req.params.idFrom);
    const idTo = parseInt(req.params.idTo);
    const idMessage = parseInt(req.params.idMessage);
    console.log("idFrom: " + idFrom + "\nidTo: " + idTo + "\nidMessage: " + idMessage);
    let message = db.retrieveMessage(idFrom, idTo, idMessage);
    if (message){
        res.status(200);
        res.send(message);
    }else{
        res.status(404);
        res.send();
    }
    
});

app.get('/chat/:idFrom/:idTo', function (req, res) {
    
    const idFrom = parseInt(req.params.idFrom);
    const idTo = parseInt(req.params.idTo);
    console.log("idFrom: " + idFrom + "\nidTo: " + idTo);
    let chat = db.retrieveChat(idFrom, idTo);
    if (chat){
        res.status(200);
        res.send(chat);
    }else{
        res.status(404);
        res.send();
    }
    
});

app.post('/chat/:idFrom/:idTo', function(req, res){
    
    const idFrom = parseInt(req.params.idFrom);
    const idTo = parseInt(req.params.idTo);
    let message = new Message();
    let jsonResp = req.body;
    if (jsonResp && jsonResp.id && jsonResp.body){
        message.id = parseInt(jsonResp.id);
        message.body = jsonResp.body;
        db.insertMessage(idFrom, idTo, message);
        res.status(201);
    }else{
        res.status(400);
    }
    
    res.send();
});

app.delete('/chat/:idFrom/:idTo/:idMessage', function (req, res) {
    
    const idFrom = parseInt(req.params.idFrom);
    const idTo = parseInt(req.params.idTo);
    const idMessage = parseInt(req.params.idMessage);
    console.log("idFrom: " + idFrom + "\nidTo: " + idTo + "\nidMessage: " + idMessage);
    if (db.deleteMessage(idFrom, idTo, idMessage)) {
        res.status(201);
    }else{
        res.status(404);
    }
    res.send();
});

app.put('/chat/:idFrom/:idTo/:idMessage', function (req, res) {
    const idFrom = parseInt(req.params.idFrom);
    const idTo = parseInt(req.params.idTo);
    let jsonResp = req.body;
    if (jsonResp && jsonResp.id && jsonResp.body){
        db.editMessage(idFrom, idTo, jsonResp);
        res.status(201);
    }else{
        res.status(404);
    }
    res.send();
});