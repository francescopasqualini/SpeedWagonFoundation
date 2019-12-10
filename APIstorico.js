var express = require('express');
var app = express();
app.use(express.json);


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

// get storico GET
app.get('/storico', function(req, res){
    console.log('GET storico');
    let json = req.body;
    var username = json["username"];
    var data_inizio = json["data_inizio"];
    var data_fine = json["data_fine"];
    console.log('DONE');
    // if (username && data_inizio && data_fine){
        
    // }
    res.response={error:"Not pervenuto"};
});
app.get('/', function(req, res){ 
  console.log("GELLO")
  res.send('Hello World!');
});

// update data PUT
app.put('/storico', function(req, res){
    console.log('PUT storico');
    let json = req.body;
    var username = json["username"];
    var data = json['data'];
    var update = json['update'];
    if (username && data && update){
      if (storicoDB[username][data]){
        for (var key in update){
          var val = storicoDB[username][data][key];
          if (update == 0){
            delete update[key];
          } else if (val) {
            val = val + update[key];
          } else if (update[key] > 0){
            storicoDB[username][data][key] = update[key];
          } else {
            console.log('Error. Unexpected value: ' + key + ' ' + update[key]);
          }
        }
      }
      res.response={
        error : null,
        done : 'Update completed.'
      }
    } else {
      res.response={
        error : 'Error. Username or data or esercizi are INVALID'
      };
    }
    res.json(res.response);
});

const port = process.env.PORT || 3000;

var server = app.listen(port, '127.0.0.1', function(){
  var host = server.address().address;
  console.log('Server running on port ', port, ' @ ', host);
});