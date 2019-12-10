/* TODO:
 *  change status code 404 to 'Malformed input' code
 **/

var express = require('express');
var app = express();

app.use(express.json());

const port =  process.env.PORT ||  3000;

app.listen(port, function() {
  console.log('Server running on port ', port);
});

// Database
var storicoDB = {
  "giovanni": {
      "1575849599": {
          addominali: 10,
          piegamenti: 20,
          pesi: 30
      },
      "1575935999": {
        piegamenti: 30,
        pesi: 10
    }
  },
  "alberto": {
    "1575849599": {
        addominali: 10,
        piegamenti: 20,
        pesi: 30
    }
  }
};

// functions
function size(a){
  let count = 0;
  for (key in a){
    ++count;
  }
  return count;
}

// add POST
app.post('/storico', function(req, res){
  console.log('POST storico');
  let code = 503;
  let json = req.body;
  let username = json["username"];
  let data = json["data"];
  let esercizi = json["esercizi"];
  if (username && data && esercizi){
    if (!storicoDB[username]){
      storicoDB[username] = {}
    }
    if (!storicoDB[username][data]){
      storicoDB[username][data] = {}
    }
    storicoDB[username][data] = esercizi;

    res.response={
      error: null,
      done: "Added " + size(esercizi) + " exercise"
    }
    code = 200;
  } else {
    res.response={
      error: "Error. Username or data or esercizi are INVALID"
    };
    code = 404;
  }

  res.status(code);
  res.send(res.response);
});

// get storico GET
app.get('/storico', function(req, res){
    console.log('GET storico');
    let json = req.body;
    let username = json["username"];
    let data_inizio = json["data_inizio"];
    let data_fine = json["data_fine"];
    console.log('DONE');
    // if (username && data_inizio && data_fine){
        
    // }
    res.response={error:"Not pervenuto"};
});

// update data PUT
app.put('/storico', function(req, res){
  console.log('PUT storico');
  let code = 503;
  let json = req.body;
  let username = json["username"];
  let data = json['data'];
  let update = json['update'];
  if (username && data && update){
    if (storicoDB[username][data]){
      for (var key in update){
        var val = storicoDB[username][data][key];
        if (update == 0){
          delete update[key];
        } else if (val) {
          // if key exists
          storicoDB[username][data][key] += update[key];
        } else if (update[key] > 0){
          // if key not exists
          storicoDB[username][data][key] = update[key];
        } else {
          console.log('Error. Unexpected value: ' + key + ' ' + update[key]);
        }
      }
    }
    res.response={
      error : null,
      done : 'Update completed.'
    };
    code = 200;
  } else {
    res.response={
      error : 'Error. Username or data or esercizi are INVALID'
    };
    code = 404;
  }
  res.status(code)
  res.json(res.response);
});

// delete data DELETE
app.delete('/storico', function(req, res){
  console.log('DELETE storico');
  let code = 503;
  let json = req.body;
  let username = json["username"];
  let data_to_del = json['data_to_del'];
  if (username && data_to_del){
    if (storicoDB[username][data_to_del]){
      delete storicoDB[username][data_to_del];
      res.response={
        error : null,
        delete: 'Del completed'
      };
      code = 200;
    } else {
      res.response={
        error : null,
        delete: 'Data to del NOT FOUND'
      };
      code = 404;
    }
  } else {
    res.response={
      error : 'Error. Username or data to del are INVALID'
    };
    code = 404;
  }
  res.status(code);
  res.json(res.response);
});