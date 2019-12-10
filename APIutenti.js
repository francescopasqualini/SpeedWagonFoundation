var express = require('express');
var app = express();

app.use(express.json());

//const port = process.env.PORT ||  3000;
const port =  process.env.PORT ||  3000;

app.listen(port, function() {
  console.log('Server running on port ', port);
});
var badFormed = {error:"request bad formed"}



//qui metto tutta la parte del "DB"

var utentiDatabase={
  1:{
    id: "1",
    password: "password",
    name:"bruno",
    surname:"crispo",
    email:"example@mail.com",
    username: "processo",
    isPt: "true",
  },
  2:{
    id: "2",
    password: "12345",
    name:"gino",
    surname:"perna",
    email:"example@mail.com",
    username: "mongodb",
    isPt: "false"
  }
};
var dim = 2;

//API search GET
//input: username di un utente
//output : la scheda di tale utente
//FUNZIONANTE
app.get('/users', function(req,res){
    console.log('API_1');
    try {
        let utentiDatabaseArray = []
        /*utentiDatabaseArray.push(utentiDatabase["1"])
        utentiDatabaseArray.push(utentiDatabase["2"])*/
        Object.keys(utentiDatabase).forEach(element => {
            utentiDatabaseArray.push(utentiDatabase[element])
        });
        /*var risposta={};
        for(var key in utentiDatabase){
            var tmp = risposta
            var risposta  = merge(tmp,utentiDatabase[key])
            console.log(typeof(risposta))
            console.log(typeof(utentiDatabase[key]))
            
        }*/
        console.log(utentiDatabaseArray[1])
        //var risposta={"users":utentiDatabaseArray}
        res.status(200)
        res.json(utentiDatabaseArray);
    } catch (error) {
        res.status(500)
        res.send()
    }
    

});

//API create POST
//input: i parametri della scheda
//output: il json della schedaL
app.get('/users/:id', function(req,res){
    console.log('API_2');
    const id = parseInt(req.params.id);
    let response=utentiDatabase[id]
    //lettura dei parametri
    if (response === undefined){
        console.log("404")
        res.status(404)
        res.send()
    }
    else {
        console.log("200")
        console.log(response)
        res.status(200).json(response);}

});



//cacella un utente
app.delete('/users/:id', function(req,res){
  console.log('API_3');
  const id = parseInt(req.params.id);
  let response=utentiDatabase[id]
  if (response === undefined){
    console.log(response)
    res.status(404)
    res.send()
  }else {
        delete utentiDatabase[id]
        res.status(200);
        res.send()
    }
});


//API Update PUT
//input : nuovi parametri della scheda e id della scheda
//output : il json della scheda

app.post('/users',function(req,res){
    console.log('API_4');
    let payload = req.body;
    if (payload["password"] === undefined || payload["name"] === undefined || 
       payload["surname"] === undefined || payload["email"] === undefined ||
       payload["isPt"] === undefined || Object.keys(payload).length != 6 || payload["username"] === undefined) {
        res.status(400).json(badFormed)
       }
    else{
        let key = dim+1;
        dim = dim +1
        key = key + "";
        utentiDatabase[key]={}
        utentiDatabase[key]["id"]=key
        utentiDatabase[key]["password"]="null"
        utentiDatabase[key]["name"]="null"
        utentiDatabase[key]["surname"]="null"
        utentiDatabase[key]["email"]="null"
        utentiDatabase[key]["username"]="null"
        utentiDatabase[key]["isPt"]="null"
        Object.keys(payload).forEach(element => {
            utentiDatabase[key][element]=payload[element]
        });
        res.status(200).send()
    }

});

app.put('/users/:id', function(req,res){
    const id = parseInt(req.params.id);
    let payload = req.body
    let utente = utentiDatabase[id];
    if (utente === undefined) {
        res.status(404).send()
    } else {
        if ((Object.keys(payload).filter(x => !["name","surname","username","password","email","isPt"].includes(x))).length > 0) {
            console.log("BAD 1 ")
            res.status(400).json(badFormed)
        }else{
            var flag = false
            Object.keys(payload).forEach(element => {
                if(!["name","surname","username","password","email","isPt"].includes(element)){
                    flag=true
                    console.log(payload[element])
                }
            });
            if (flag == true) {
                res.status(400).json(badFormed)
                console.log("bad 2")
            } else {
                Object.keys(payload).forEach(element => {
                    utentiDatabase[id][element]=payload[element]
                });
                res.status(200).send(utentiDatabase[id])
            }
            
        }
    }
  });

