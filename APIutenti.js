var express = require('express');
var app = express();

app.use(express.json());


const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server running on port ', port);
});
var badFormed = { error: "request bad formed" }
var notFound = { error: "id not found" }
var serverError = { error: "server error" }





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


app.get('/users', function (req, res) {
    console.log('API_1');
    try {
        let utentiDatabaseArray = []
        Object.keys(utentiDatabase).forEach(element => {
            utentiDatabaseArray.push(utentiDatabase[element])
        });

        var limit = req.query.limit
        var offset = req.query.offset
        console.log(limit)
        console.log(offset)
        if (limit == undefined || offset == undefined) {
            res.status(200)
            res.json(utentiDatabaseArray);
        } else {
            let tmpArray = []
            for (let index = offset; index < utentiDatabaseArray.length && index < (offset + limit); index++) {
                console.log(index)
                console.log(utentiDatabaseArray[index])
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
        }

    } catch (error) {
        res.status(500)
        res.json(serverError)
    }


});

app.get('/users/:id', function (req, res) {
    try {

        console.log('API_2');
        const id = parseInt(req.params.id);
        let response = utentiDatabase[id]
        //lettura dei parametri
        if (response === undefined) {
            console.log("404")
            res.status(404)
            res.json(notFound)
        }
        else {
            console.log("200")
            console.log(response)
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
        console.log('API_3');
        const id = parseInt(req.params.id);
        let response = utentiDatabase[id]
        if (response === undefined) {
            console.log(response)
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
        console.log('API_4');
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
                console.log("BAD 1 ")
                res.status(400).json(badFormed)
            } else {
                var flag = false
                Object.keys(payload).forEach(element => {
                    if (!["name", "surname", "username", "password", "email", "isPt"].includes(element)) {
                        flag = true
                        console.log(payload[element])
                    }
                });
                if (flag == true) {
                    res.status(400).json(badFormed)
                    console.log("bad 2")
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

