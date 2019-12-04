var express = require('express');
var app = express();

app.use(express.json());

const port = 3000;

app.listen(port, function() {
  console.log('Server running on port ', port);
});

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


app.get('/visualizzascheda', function(req,res){
    let json = req.body;
    var username = json["username"];

    if(username == 'Luca'){
      res.response={

            username: "username",
            id : 0,
            nome : "nome",
            tempo_recupero : 0,
            peso : 0,
            nserie : 0,
            nripetizioni : 0,
            descrizione : "descrizione"
      }

      res.json(res.response);

    }
});

app.get('/creascheda', function(req,res){

    let username = "";
    let id = 0;
    let nome = "";
    let tempo_recupero = 0;
    let peso = 0;
    let nserie = 0;
    let nripetizioni = 0;
    let descrizione = "descrizione";

    username = req.query.username;
    id = req.query.id;
    nome = req.query.nome;
    tempo_recupero = req.query.tempo_recupero;
    peso = req.query.peso;
    nserie = req.query.nserie;
    nripetizioni = req.query.nripetizioni;
    descrizione = req.query.descrizione;

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

app.get('/modificascheda', function(req,res){

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
