var express = require('express');
var app = express();

app.use(express.json());

//const port = process.env.PORT ||  3000;
const port =  process.env.PORT ||  3000;

app.listen(port, function() {
  console.log('Server running on port ', port);
});

let merge = (...arguments) => {

    // Variables
    let target = {};
  
    // Merge the object into the target object
    let merger = (obj) => {
        for (let prop in obj) {
       if (obj.hasOwnProperty(prop)) {
           if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          // If we're doing a deep merge and the property is an object
          target[prop] = merge(target[prop], obj[prop]);
           } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop];
           }
       }
        }
    };
  
   //Loop through each object and conduct a merge
   for (let i = 0; i < arguments.length; i++) {
       merger(arguments[i]);
   }
  
   return target;
  };

  function mergeArrayObjects(arr1,arr2){
    return arr1.map((item,i)=>{
       if(item.id === arr2[i].id){
           //merging two objects
         return merge(item,arr2[i])
       }
    })
  }
  


//qui metto tutta la parte del "DB"

var utentiDatabase={
  1:{
    id: "1",
    password: "password",
    name:"bruno",
    surname:"crispo",
    email:"example@mail.com",
    isPt: "true",
    username: "processo"
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
        for(var key in utentiDatabase){
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
    let key = dim+1;
    dim = dim +1
    key = key + "";
    let tmp = {id: "null", password: "null", name: "null", surname: "null",  email: "null", isPt: "null"}
    var tmpArray = ["id","password","name","surname","email","username","isPt"]
    console.log(Object.keys(payload))
    tmpArray.forEach(element => {
        console.log(element)
        tmp[element]=payload[element]
    });
    console.log("adad")
    utentiDatabase[key]=tmp/*
    Object.assign(utentiDatabase[key],tmp)*/
    //utentiDatabase[key]=payload
    res.status(200).send()

   /* var usernameToFind = json["username"];

    //controllo se l'username c'è nel mio "DB"
    var found = false;

    for(var key in SchedeDatabase){

      var value = SchedeDatabase[key];
      var usernameToCheck = value["username"];
      if(usernameToCheck == usernameToFind){
        found = true;
        res.json(value);
      }
    }

    //non so bene come fare in modo che vengano cambiati


    //ritorno il json della scheda
    res.response={
    console.log('API_4');
    let json = req.body;
      username : username,
      N_esercizi : N_esercizi,
      esercizi : esercizi,
    }
    res.json(res.response);*/

});

app.put('/users/:id', function(req,res){
    const id = parseInt(req.params.id);
    let payload = req.body
    let utente = utentiDatabase[id];
    
    if (utente === undefined) {
        res.status(404).send()
    } else {
        Object.keys(payload).forEach(element => {
            utentiDatabase[id][element]=payload[element]
        });
        res.status(200).send(utentiDatabase[id])
    }
  });


//API Delete DELETE
//input : ide della scheda
//output : "cancello" la scheda e restutisco boh
/*
app.get('/schede/delete',function(req,res){
    console.log('API_5');
    let id = req.query.id;
    //togli tale item dal "DB"
    //restituisci : yeah l'ho tolto
})
*/




//vecchie cose
/*
{
    "username": "username",
    "esercizi":[
        [
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            ...
        ],
        [
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            ...
        ],
        ...
    ]
}
*/

                  /*
var SchedeDatabase={
  scheda1:{
    username: "Luca",
    id : 1,
    nome : "panca piana",
    tempo_recupero : 120,
    peso : 20,
    nserie : 4,
    nripetizioni : 90,
    descrizione : "usa la panca piana"
  },
  scheda2:{
    username: "Federico",
    id : 2,
    nome : "addominali",
    tempo_recupero : 240,
    peso : 10,
    nserie : 7,
    nripetizioni : 10,
    descrizione : "fai degli addominali"
  },
  scheda3:{
    username: "Sara",
    id : 3,
    nome : "flessioni",
    tempo_recupero : 60,
    peso : 20,
    nserie : 2,
    nripetizioni : 20,
    descrizione : "fai delle flessioni"
  }
}*/
/*
var schede = {
    "username": "username",
    "esercizi":[
        [
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            ...
        ],
        [
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            {
                "id" : 0,
                "nome" : "nome",
                "tempo_recupero": 0,
                "peso": 0,
                "nserie": 0,
                "nripetizioni": 0,
                "descrizione": "descrizione"
            },
            ...
        ],
        ...
    ]
*/