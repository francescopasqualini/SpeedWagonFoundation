var express = require('express');
var app = express();
app.use(express.json);
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('Server running on port ', port);
});

// Database
//// change date with timestamp of the day
var storicoDB = {
  "giovanni": {
      "08/12/2019": {
          addominali: 10,
          piegamenti: 20,
          pesi: 30
      },
      "09/12/2019": {
        piegamenti: 30,
        pesi: 10
    }
  },
  "alberto": {
    "08/12/2019": {
        addominali: 10,
        piegamenti: 20,
        pesi: 30
    }
  }
};

// add POST
app.post('/storico', function(req, res){
  console.log('POST storico');
  let json = req.body;
  var username = json["username"];
  var data = json["data"];
  var esercizi = json["esercizi"];
  if (username && data && esercizi){
      storicoDB[username][data] = esercizi;
      res.response={
          error: null,
          done: "Added " + esercizi.length + "exercise"
      }
  } else {
    res.response={
        error: "Error. Username or data or esercizi are INVALID"
    };
  }
  res.json(res.response);
});

// get storico ET
app.get('/storico', function(req, res){
    console.log('GET storico');
    let json = req.body;
    var username = json["username"];
    var data_inizio = json["data_inizio"];
    var data_fine = json["data_fine"];
    if (username && data_inizio && data_fine){
        
    }
});