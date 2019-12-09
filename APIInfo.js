var express = require('express');
var app = express();

app.use(express.json);

const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('Server running on port ', port);
});

var infoDb = {
  orario:{
    type: "orario",
    apertura_feriale: "7.00",
    chiusura_feriale: "22.30",
    apertura_festiva: "10.00",
    chiusura_feriale: "20.00"
  },
  corsi:{
    type: "corsi",
    difesa_personale: "lun, mer, ven dalle 16.30 alle 18.00",
    cardio_fitness: "mar, gio dalle 16.30 alle 17.30",
    box: "lun, mer, ven dalle 18.30 alle 20.30",
    pilates: "mar, gio dalle 18.30 alle 20.00",
    yoga: "tutti i giorni dalle 21 alle 22"
  },
  istruttori:{
    type: "istruttori",
    difesa_personale: "Paolo Miglio",
    cardio_fitness: "Ilaria Zanobini",
    box: "Silvester Stallone",
    pilates: "Enrico Borromeo",
    yoga: "Maria Juana"
  },
  sale: {
    type: "sale",
    descrizione: "2 sale corsi e yoga, 2 sala pesi e attrezzi, 1 sala per la box"
  }
};

//search GET
app.get('/info/retrive', function (req, res){
  console.log('searching for a info');
  let json = req.body;
  var typeToFind = json["type"];
  var found = false;
  for (var key in infoDb){
    var value = infoDb[key];
    var typeToCheck = value["type"];
    if (typeToCheck == typeToFind){
      found = true;
      res.json(value);
    }
  }
  res.response={
    error: "ERROR! INFO NOT FOUND!"
  }
  res.json(res.response);
});