/******* configs ********/
var express = require('express');
const bodyParser = require('body-parser')
const classes = require('./classes') 

var app = express();
app.use(express.json());
app.use(bodyParser.json())

const Message = classes.Message
const port = process.env.PORT || 3000
var db = classes.db

app.listen(port, function () {
    console.log('Server running on port ', port);
});

const MessageTypes = ['text', 'image', 'voicemail', 'video']
const badFormed = { error: "request bad formed" }
const notFound = { error: "id not found" }
const serverError = { error: "server error" }

var utentiDatabase = {
    1: {
        id: 1,
        password: "password",
        name: "bruno",
        surname: "crispo",
        email: "example@mail.com",
        username: "processo",
        isPt: true,
    },
    2: {
        id: 2,
        password: "12345",
        name: "gino",
        surname: "perna",
        email: "example@mail.com",
        username: "mongodb",
        isPt: false
    }
};
var dim = 2;

/*middlewares*/ 

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

    if (consistencyCheck && isInDbCheck) {
        res.locals.idFrom = idFrom
        res.locals.idTo = idTo
        res.locals.idMessage = idMessage
        next()
    } else if (!consistencyCheck) {
        res.status(400).json(badFormed)
    } else {
        res.status(404).json(notFound)
    }
});

app.use('/chat/:idFrom/:idTo?/:idMessage?', function (req, res, next) {
    console.log(`${req.method} : ${req.originalUrl}`)
    next()
})


/********* /chat api **********/s

/* Retrieve the whole dbchat. For testing purposes*/
app.get('/chat', function (req, res) {
    res.status(200)
    res.json(db.dbchat)
})

//get a message
app.get('/chat/:idFrom/:idTo/:idMessage', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    const idMessage = res.locals.idMessage
    let message = db.retrieveMessage(idFrom, idTo, idMessage)
    if (message) {
        res.status(200).json(message)
    } else {
        res.status(404).json(notFound)
    }

})

//get a chat
app.get('/chat/:idFrom/:idTo', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    let chat = db.retrieveChat(idFrom, idTo)
    if (chat) {
        res.status(200).json(chat)
    } else {
        res.status(404).json(notFound)
    }

})

//post a message (user to user)
app.post('/chat/:idFrom/:idTo', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    let body = req.body
    if (body && body.content && MessageTypes.includes(body.type)) {
        let message = new Message(body.type, idFrom, idTo, body.content)
        if (db.sendMessage(idFrom, idTo, message)) {
            res.status(201).send()
        } else {
            res.status(500).json(serverError)
        }
    } else {
        res.status(400).json(badFormed)
    }
})

//post a message (user to all)
app.post('/chat/:idFrom', function (req, res) {
    const idFrom = res.locals.idFrom
    let body = req.body
    if (body && body.content && MessageTypes.includes(body.type)) {
        let success = true
        Object.keys(utentiDatabase).forEach(function (user) {
            if (user != idFrom) {
                let message = new Message(body.type, idFrom, user, body.content)
                success = db.sendMessage(idFrom, user, message) && success
            }
        })
        if (success) {
            res.status(201).send()
        } else {
            res.status(500).json(serverError)
        }
    } else {
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
    } else {
        res.status(404).json(notFound)
    }
})

//edit a message
app.put('/chat/:idFrom/:idTo/:idMessage', function (req, res) {
    const idFrom = res.locals.idFrom
    const idTo = res.locals.idTo
    const idMessage = res.locals.idMessage
    let body = req.body
    if (body && body.content) {
        body.id = idMessage
        if (db.editMessage(idFrom, idTo, body)) {
            res.status(204).send()
        } else {
            res.status(404).json(notFound)
        }
    } else {
        res.status(400).json(badFormed)
    }
})


/********* /users api **********/

app.get('/users', function (req, res) {
    //console.log('API_1');
    try {
        let utentiDatabaseArray = []
        Object.keys(utentiDatabase).forEach(element => {
            utentiDatabaseArray.push(utentiDatabase[element])
        });

        var limit = req.query.limit
        var offset = req.query.offset
        //console.log(limit)
        //console.log(offset)
        if (limit == undefined) {
            limit = 10
        }
        if (offset == undefined) {
            offset = 0
        }
        let tmpArray = []
        for (let index = offset; index < utentiDatabaseArray.length && index < (offset + limit); index++) {
            // console.log(index)
            //console.log(utentiDatabaseArray[index])
            tmpArray.push(utentiDatabaseArray[index])

        }
        let risposta = {
            results: tmpArray,
            metadata: {
                total: utentiDatabaseArray.length
            }
        }
        res.status(200)
        res.json(risposta);


    } catch (error) {
        res.status(500)
        res.json(serverError)
    }


});

app.get('/users/:id', function (req, res) {
    try {

        //console.log('API_2');
        const id = parseInt(req.params.id);
        let response = utentiDatabase[id]
        //lettura dei parametri
        if (response === undefined) {
            //console.log("404")
            res.status(404)
            res.json(notFound)
        }
        else {
            //console.log("200")
            //console.log(response)
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500)
        res.json(serverError)
    }

});



//cacella un utente
app.delete('/users/:id', function (req, res) {
    try {
        //console.log('API_3');
        const id = parseInt(req.params.id);
        let response = utentiDatabase[id]
        if (response === undefined) {
            //console.log(response)
            res.status(404)
            res.json(notFound)
        } else {
            let tmp = utentiDatabase[id]
            delete utentiDatabase[id]
            res.status(200);
            res.json(tmp)
        }
    } catch (error) {
        res.status(500)
        res.json(serverError)
    }

});



app.post('/users', function (req, res) {
    try {
        //console.log('API_4');
        let payload = req.body;
        if (payload["password"] === undefined || payload["name"] === undefined ||
            payload["surname"] === undefined || payload["email"] === undefined ||
            payload["isPt"] === undefined || Object.keys(payload).length != 6 || payload["username"] === undefined) {
            res.status(400).json(badFormed)
        }
        else {
            let key = dim + 1;
            dim = dim + 1
            key = key + "";
            utentiDatabase[key] = {}
            utentiDatabase[key]["id"] = dim
            utentiDatabase[key]["password"] = "null"
            utentiDatabase[key]["name"] = "nul404l"
            utentiDatabase[key]["surname"] = "null"
            utentiDatabase[key]["email"] = "null"
            utentiDatabase[key]["username"] = "null"
            utentiDatabase[key]["isPt"] = false
            Object.keys(payload).forEach(element => {
                utentiDatabase[key][element] = payload[element]
            });
            res.status(200).json(utentiDatabase[key])
        }
    } catch (error) {
        res.status(500)
        res.json(serverError)
    }


});

app.put('/users/:id', function (req, res) {
    try {
        const id = parseInt(req.params.id);
        let payload = req.body
        let utente = utentiDatabase[id];
        if (utente === undefined) {
            res.status(404).json(notFound)
        } else {
            if ((Object.keys(payload).filter(x => !["name", "surname", "username", "password", "email", "isPt"].includes(x))).length > 0) {
                //console.log("BAD 1 ")
                res.status(400).json(badFormed)
            } else {
                var flag = false
                Object.keys(payload).forEach(element => {
                    if (!["name", "surname", "username", "password", "email", "isPt"].includes(element)) {
                        flag = true
                        //console.log(payload[element])
                    }
                });
                if (flag == true) {
                    res.status(400).json(badFormed)
                    //console.log("bad 2")
                } else {
                    Object.keys(payload).forEach(element => {
                        utentiDatabase[id][element] = payload[element]
                    });
                    res.status(200).json(utentiDatabase[id])
                }

            }
        }
    } catch (error) {
        res.status(500)
        res.json(serverError)
    }

});


