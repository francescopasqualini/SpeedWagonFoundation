var express = require('express');
var app = express();

app.use(express.json());

const port = 3000;

// Handling GET requests
app.get('/', function(req, res) {
  res.send('Hello World!');
});
app.get('/perna', function(req, res) {
    res.send('Hello World perna!');
  });
app.post('/json', (req, res) => {
    let json=req.body;
    //var a=json["nome"]

    res.response={
      nome : 'luca',
      cognome: 'staben'
    }
    res.json(res.response);

});
app.get('/param', function(req, res) {
    let jacopo = req.query.a;
    if (jacopo == "jacopo"){
        res.send('Hello World not jacopo! '.concat(req.query.a));
    }
    else{
        let prova=req.query.a+"";
        res.send('Hello World jacopo! '.concat(prova));
    }
  });

app.listen(port, function() {
  console.log('Server running on port ', port);
});

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
    let username = req.query.username;
    let id = req.query.id;
    let nome = req.query.nome;
    let tempo_recupero = req.query.tempo_recupero;
    let peso = req.query.peso;
    let nserie = req.query.nserie;
    let nripetizioni = req.query.nripetizioni;
    let descrizione = req.query.descrizione;


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
  let username = req.query.username;
  let id = req.query.id;
  let nome = req.query.nome;
  let tempo_recupero = req.query.tempo_recupero;
  let peso = req.query.peso;
  let nserie = req.query.nserie;
  let nripetizioni = req.query.nripetizioni;
  let descrizione = req.query.descrizione;

  /*
  if(username == ''){
    res.send("non l'hai settato");
  }*/

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


/*
{
    "username": "username",
    "id" : 0,
    "nome" : "nome",
    "tempo_recupero": 0,
    "peso": 0,
    "nserie": 0,
    "nripetizioni": 0,
    "descrizione": "descrizione"
}

*/
