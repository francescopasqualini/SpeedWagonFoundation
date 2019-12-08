var express = require('express');
var app = express();

app.use(express.json());

//const port = process.env.PORT ||  3000;
const port =  3000;

app.listen(port, function() {
  console.log('Server running on port ', port);
});

//qui metto tutta la parte del "DB"

var loginDatabase={
  processo:{
    password: "password",
    name:"bruno",
    surname:"crispo",
    email:"example@mail.com",
    isPt: "true"
  },
  mongodb:{
    password: "12345",
    name:"gino",
    surname:"perna",
    email:"example@mail.com",
    isPt: "false"
  },
  monkeyEatedBanana:{
    password: "qwety",
    name:"fausto",
    surname:"giunchiglia",
    email:"example@mail.com",
    isPt: "true"
  }
};

var SchedeDatabase={
    scheda1:{
      username: "bruno",
      N_esercizi: 2,
      esercizi:{
        esercizio1: {
            "id" : 1,
            "nome" : "nome",
            "tempo_recupero": 0,
            "peso": 0,
            "nserie": 0,
            "nripetizioni": 0,
            "descrizione": "descrizione"
        },
        esercizio2:{
            "id" : 2,
            "nome" : "nome",
            "tempo_recupero": 0,
            "peso": 0,
            "nserie": 0,
            "nripetizioni": 0,
            "descrizione": "descrizione"
        }
    }
   },
   scheda2:{
     username: "gino",
     N_esercizi: 2,
     esercizi:{
       esercizio1: {
           "id" : 3,
           "nome" : "nome",
           "tempo_recupero": 0,
           "peso": 0,
           "nserie": 0,
           "nripetizioni": 0,
           "descrizione": "descrizione"
       },
       esercizio2:{
           "id" : 4,
           "nome" : "nome",
           "tempo_recupero": 0,
           "peso": 0,
           "nserie": 0,
           "nripetizioni": 0,
           "descrizione": "descrizione"
       }
   }
  },
  scheda3:{
    username: "fausto",
    N_esercizi: 2,
    esercizi:{
      esercizio1: {
          "id" : 5,
          "nome" : "nome",
          "tempo_recupero": 0,
          "peso": 0,
          "nserie": 0,
          "nripetizioni": 0,
          "descrizione": "descrizione"
      },
      esercizio2:{
          "id" : 6,
          "nome" : "nome",
          "tempo_recupero": 0,
          "peso": 0,
          "nserie": 0,
          "nripetizioni": 0,
          "descrizione": "descrizione"
      }
  }
 }
};


//API search GET
//input: username di un utente
//output : la scheda di tale utente
//FUNZIONANTE
app.get('/schede/search', function(req,res){
    console.log('API_1');

    //leggo dall'input l'username di cui voglio fare search della scheda
    let json = req.body;
    var usernameToFind = json["username"];

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

    //nel caso non venga trovato...
    res.response={
      error : "ERROR, USERNAME NON TROVATO",
    }
    res.json(res.response);
});

//API create POST
//input: i parametri della scheda
//output: il json della scheda
app.get('/schede/create', function(req,res){
    console.log('API_2');

    //lettura dei parametri
    let username = req.query.username;
    let N_esercizi = req.query.N_esercizi;
    let esercizi = req.query.esercizi;
    console.log(esercizi);

    res.response={
      username : username,
      N_esercizi : N_esercizi,
      esercizi : esercizi,
    }
    res.json(res.response);

});



//API Read GET
///boh forse non va fatta
app.get('/schede/read', function(req,res){
  console.log('API_3');
});


//API Update PUT
//input : nuovi parametri della scheda e id della scheda
//output : il json della scheda

app.get('/schede/update',function(req,res){
    console.log('API_4');

    //ottengo la scheda dal DB
    //leggo dall'input l'username di cui voglio fare search della scheda
    let json = req.body;
    var usernameToFind = json["username"];

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
      username : username,
      N_esercizi : N_esercizi,
      esercizi : esercizi,
    }
    res.json(res.response);

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
