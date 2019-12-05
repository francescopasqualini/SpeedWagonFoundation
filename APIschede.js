var express = require('express');
var app = express();

app.use(express.json());

const port = process.env.PORT ||  3000;

app.listen(port, function() {
  console.log('Server running on port ', port);
});

//qui metto tutta la parte del "DB"

var loginDatabase={processo:{password: "password",name:"bruno",surname:"crispo",email:"example@mail.com",isPt: "true"},
                   mongodb:{password: "12345",name:"gino",surname:"perna",email:"example@mail.com",isPt: "false"},
                   monkeyEatedBanana:{password: "qwety",name:"fausto",surname:"giunchiglia",email:"example@mail.com",isPt: "true"}
                  }
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
}

//API search GET
//input: username di un utente
//output : la scheda di tale utente
app.get('/schede/search', function(req,res){
    console.log('API_1');

    let json = req.body;

    var id = json["id"];
    // il resto tutti i parametri delle API

    //controllo se l'id c'è nel mio "DB", se si allora ritorno la scheda, il controllo lo faccio per ogni scheda nel DB
    var i;
    for (i = 0; i < N_SCHEDE; i++) {
      if(id == /*scheda_id*/){

        //prendi dal DB la scheda
        res.json(res.response);
      }
    }
});

//API Create POST
//input: i parametri della scheda
//output: il json della scheda
app.get('/schede/create', function(req,res){
    console.log('API_2');

    let username = req.query.username;
    let id = req.query.id;
    let nome = req.query.nome;
    let tempo_recupero = req.query.tempo_recupero;
    let peso = req.query.peso;
    let nserie = req.query.nserie;
    let nripetizioni = req.query.nripetizioni;
    let descrizione = req.query.descrizione;
    //e altri eventuali parametri della scheda

    res.response={
      username : username,
      id : id,
      nome : nome,
      tempo_recupero : tempo_recupero,
      peso : peso,
      nserie : nserie,
      nripetizioni : nripetizioni ,
      descrizione : descrizione
    }

    res.json(res.response);

});

//API Read GET
///boh
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

//API Update PUT
//input : nuovi parametri della scheda e id della scheda
//output : il json della scheda
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

//API Delete DELETE
//input : ide della scheda
//output : "cancello" la scheda e restutisco boh
app.get('/schede/delete',function(req,res){
    console.log('API_5');

    let id = req.query.id;

    //togli tale item dal "DB"
    //restituisci : yeah l'ho tolto

})
