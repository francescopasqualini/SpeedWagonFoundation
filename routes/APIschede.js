
const express = require('express');
const router = express.Router();


var SchedeDatabase={
    1:{
     username: "bruno",
      N_esercizi: 2,
      esercizi:{
        esercizio1: {
            "id" : 1,
            "nome" : "panca",
            "tempo_recupero": 120,
            "peso": 20,
            "nserie": 5,
            "nripetizioni": 5,
            "descrizione": "usa la panca"
        },
        esercizio2:{
            "id" : 2,
            "nome" : "flessioni",
            "tempo_recupero": 60,
            "peso": 1,
            "nserie": 7,
            "nripetizioni": 2,
            "descrizione": "fai le flessioni"
        }
    }
   },
   2:{
     username: "gino",
     N_esercizi: 2,
     esercizi:{
       esercizio1: {
           "id" : 3,
           "nome" : "trazioni",
           "tempo_recupero": 240,
           "peso": 5,
           "nserie": 50,
           "nripetizioni": 10,
           "descrizione": "fai le trazioni"
       },
       esercizio2:{
           "id" : 4,
           "nome" : "military press",
           "tempo_recupero": 10,
           "peso": 50,
           "nserie": 3,
           "nripetizioni": 9,
           "descrizione": "fai la military press"
       }
   }
  },
  3:{
    username: "fausto",
    N_esercizi: 2,
    esercizi:{
      esercizio1:{
          "id" : 5,
          "nome" : "stacco",
          "tempo_recupero": 120,
          "peso": 80,
          "nserie": 70,
          "nripetizioni": 5,
          "descrizione": "fai lo stacco"
      },
      esercizio2:{
          "id" : 6,
          "nome" : "squat",
          "tempo_recupero": 120,
          "peso": 40,
          "nserie":30,
          "nripetizioni": 30,
          "descrizione": "fai gli squat"
      }
  }
 }
};
var next_id = 4;


//API search GET
//input: l'ID della scheda
//output : la scheda di tale utente
router.get('/:id', function(req,res){
    console.log('API_search');

    const idToFind = parseInt(req.params.id);

    var found = false;

    for(var key in SchedeDatabase){
      if(key == idToFind){
        found = true;
        res.status(200);
        res.json(SchedeDatabase[key]);
      }
    }

    res.response={
      error : "ERROR, SCHEDA NON TROVATA",
    }
    res.status(404);
    res.json(res.response);
});


//API create POST
//input: i parametri della scheda tramite un json
//output: il json della scheda
router.post('/', function(req,res){
    console.log('API_create');
    let json = req.body;

    let username = json["username"];
    let N_esercizi = json["N_esercizi"];
    let esercizi = json["esercizi"];

    var item={
      username : username,
      N_esercizi : N_esercizi,
      esercizi : esercizi
    }

    SchedeDatabase[next_id]=item;
    next_id = next_id + 1;

    res.response={
      item
    }
    res.status(200);
    res.json(res.response);

});


//API Update PUT
//input : id della scheda e json della scheda
//output : il json della scheda
router.put('/:id',function(req,res){
    console.log('API_update');

    const idToFind = parseInt(req.params.id);

    var found = false;
    var keyToChange;
    for(var key in SchedeDatabase){
      if(key == idToFind){
        found = true;
        keyToChange = key;
      }
    }

    let json = req.body;
    if(found == true){

      let username = json["username"];
      let N_esercizi = json["N_esercizi"];
      let esercizi = json["esercizi"];

      var item = {
        username : username,
        N_esercizi : N_esercizi,
        esercizi : esercizi
      }

      SchedeDatabase[keyToChange] = item;

      res.response={
        item
      }
      res.status(200);
      res.json(res.response);
    }
    else{
      res.response={
        error : "ERROR, SCHEDA NON TROVATA"",
      }
      res.status(404);
      res.json(res.response);
    }

});


//API Delete DELETE
//input : id della scheda
//output : "cancello" la scheda
router.delete('/:id',function(req,res){
    console.log('API_delete');

    const idToDelete = parseInt(req.params.id);

    var found = false;
    var keyToRemove;
    for(var key in SchedeDatabase){

      if(key == idToDelete){
        found = true;
        keyToRemove = key;
      }
    }

    if(found == true){

      delete SchedeDatabase[keyToRemove];
      res.response={
        responso : "CANCELLATO ITEM",
      }
      res.status(200);
      res.json(res.response);
    }
    else{
      res.response={
        error : "ERROR, SCHEDA NON TROVATA"",
      }
      res.status(404);
      res.json(res.response);
    }
});

module.export = router;
