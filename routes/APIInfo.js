const express = require('express');
const router = express.Router();

var infoDb = [
  {
    type: "orario",
    apertura_feriale: "7.00",
    chiusura_feriale: "22.30",
    apertura_festiva: "10.00",
    chiusura_festiva: "20.00"
  },
  {
    type: "corsi",
    difesa_personale: "lun, mer, ven dalle 16.30 alle 18.00",
    cardio_fitness: "mar, gio dalle 16.30 alle 17.30",
    box: "lun, mer, ven dalle 18.30 alle 20.30",
    pilates: "mar, gio dalle 18.30 alle 20.00",
    yoga: "tutti i giorni dalle 21 alle 22"
  },
  {
    type: "istruttori",
    difesa_personale: "Paolo Miglio",
    cardio_fitness: "Ilaria Zanobini",
    box: "Silvester Stallone",
    pilates: "Enrico Borromeo",
    yoga: "Maria Juana"
  },
  {
    type: "sale",
    descrizione: "2 sale corsi e yoga, 2 sala pesi e attrezzi, 1 sala per la box"
  }
];

//search GET
router.get('/', function (req, res){
  res.status(200);
  res.json(infoDb);
});

//search by type GET
router.get('/:type', function (req, res){
  const typeToRetrive = req.params.type;
  var found = false;
  var response = [];
  for (var i=0; i < infoDb.length; i++){
    if(infoDb[i].type == typeToRetrive){
      found = true;
      response.push(infoDb[i]);
    }
  }
  if (!found){
    res.status(404);
    res.json({ERRORE: "Type non esistente!"});
  } else {
    res.status(200);
    res.json(response);
  }
});

//search a specific field of a type GET
router.get('/:type/:key', function (req, res){
  const typeToRetrive = req.params.type;
  const keyToRetrive = req.params.key;
  var found = false;
  var response = [];
  for (var i=0; i < infoDb.length; i++){
    if(infoDb[i].type == typeToRetrive){
      for (var key in infoDb[i]){
        if(key == keyToRetrive){
          response.push({[key]: infoDb[i][key]});
          found = true;
        }
      }
    }
  }
  if (!found){
    res.status(404);
    res.json({ERRORE: "Type non esistente!"});
  } else {
    res.status(200);
    res.json(response);
  }
});

//add new info POST
router.post('/', function (req, res){
  let newInfo = req.body;
  if (req.body["type"]==undefined){
    res.status(400);
    res.json({ERRORE: "Campo type non presente!"});
  } 
  else {
    var found = false;
    for( var i=0; i<infoDb.length; i++){
      if(req.body["type"]==infoDb[i]["type"]){
        found = true;
      }
    }
    if(found){
      res.status(400);
      res.json({ERRORE: "Campo type già presente!"});
    } else {
      infoDb.push(newInfo);
      res.location('/info/' + newInfo.type);
      res.status(201);
      res.json({OK: "Info creata con successo!"});
    }
  }
});

//modify existing info PUT
router.put('/:type', function (req, res){
  const typeToModify = req.params.type;
  var found = false;
  for (var i=0; i < infoDb.length; i++){
    if(infoDb[i].type == typeToModify){
      found = true;
      for (var key1 in infoDb[i]){
        for (var key2 in req.body){
          if (key1 == key2){
            infoDb[i][key1] = req.body[key2];
          } else {
            infoDb[i][key2] = req.body[key2];
          }
        }
      }
      
    }
  }
  if (!found){
    res.status(404);
    res.json({ERRORE: "Type già esistente!"});
  } else {
    res.status(200);
    res.json({OK: "Info modificata con successo!"});
  }
});

//delete completely existing info DELETE
router.delete('/:type', function(req,res){
  const typeToDelete = req.params.type;
  var found = false;
  for (var i=0; i < infoDb.length; i++){
    if(infoDb[i].type == typeToDelete){
      found = true;
      infoDb.splice(i,1);
    }
  }
  if (!found){
    res.status(404);
    res.json({ERRORE: "Type non esistente!"});
  } else {
    res.status(200);
    res.json({OK: "Info eliminata con successo!"});
  }
});

//delete partially an existing info DELETE
router.delete('/:type/:key', function(req,res){
  const typeToModify = req.params.type;
  const keyToDelete = req.params.key;
  var found = false;
  for (var i=0; i < infoDb.length; i++){
    if(infoDb[i].type == typeToModify){
      found = true;
      var deleted = false;
      for (var key1 in infoDb[i]){
        if(key1 == keyToDelete && keyToDelete != "type"){
          delete infoDb[i][keyToDelete];
          deleted = true;
        }
      }
      if (keyToDelete == "type"){
        res.status(500);
        res.json({ERRORE: "Impossibile eliminare il campo type!"});
      } else if (!deleted){
        res.status(404);
        res.json({ERRORE: "Campo non esistente!"});
      }
    }
  }
  if (!found){
    res.status(404);
    res.json({ERRORE: "Type non esistente!"});
  } else {
    res.status(200);
    res.json({OK: "Info eliminata con successo!"});
  }
});

module.exports = router;