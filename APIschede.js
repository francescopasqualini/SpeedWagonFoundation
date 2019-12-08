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

//API Create POST
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
/*
app.get('/schede/read', function(req,res){
  console.log('API_3');
  //leggo l'id della scheda che voglio modificare
  let id = req.query.id;

  //prendo dal dizionario la scheda che voglio

  //la modifico


  res.response={
    username : username,
    id : id,
    nome : nome,
    tempo_recupero : tempo_recupero,
    peso : peso,
    nserie : nserie,
    nripetizioni : nripetizioni ,
    descrizione : descrizione
    //tutto il resto dei parametri
  }

  res.json(res.response);
});
*/


//API Update PUT
//input : nuovi parametri della scheda e id della scheda
//output : il json della scheda
/*
app.get('/schede/update',function(req,res){
    console.log('API_4');

    let username = "";
    let id = 0;
    let nome = "";
    let tempo_recupero = 0;
    let peso = 0;
    let nserie = 0;
    let nripetizioni = 0;
    let descrizione = "descrizione";
    //e altri eventuali parametri della scheda

    username = req.query.username;
    id = req.query.id;
    nome = req.query.nome;
    tempo_recupero = req.query.tempo_recupero;
    peso = req.query.peso;
    nserie = req.query.nserie;
    nripetizioni = req.query.nripetizioni;
    descrizione = req.query.descrizione;

    //scorri tutto il DB per trovare la scheda giusta, poi update i parametri e ritornala

    res.response={
      username : username,
      id : id,
      nome : nome,
      tempo_recupero : tempo_recupero,
      peso : peso,
      nserie : nserie,
      nripetizioni : nripetizioni,
      descrizione : descrizione
    }

    res.json(res.response);

});
*/


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
