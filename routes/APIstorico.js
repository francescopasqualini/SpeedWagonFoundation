var express = require('express');
const router = express.Router();

//-----------------------------------------------------------------------//
// Database
var storicoDB = {
  1: [
      {
        timestamp: 1575849599,
        esercizi: [ "addominali", "piegamenti", "pesi" ],
        ripetizioni: [ 10, 20, 30 ]
      },
      {
        timestamp: 1575935999,
        esercizi: [ "piegamenti", "pesi" ],
        ripetizioni: [ 30, 10 ]
      }
    ],
  2: [
      {
        timestamp: 1575849599,
        esercizi: [ "addominali", "piegamenti", "pesi" ],
        ripetizioni: [ 10, 20, 30 ]
      }
    ],
  3: [
    {
      timestamp: 1575849599,
      esercizi: [ "addominali", "piegamenti", "pesi" ],
      ripetizioni: [ 10, 20, 30 ]
    }
  ]
};

// functions
function size(a){
  let count = 0;
  for (key in a){
    ++count;
  }
  return count;
}

function contains_time(db, timestamp){
  for (let i = 0; i < db.length; i++){
    if (db[i] && db[i]["timestamp"] == timestamp){
      return true;
    }
  }
  return false;
}

function get_index_storico_data(db, timestamp){
  for (let i = 0; i < db.length; i++){
    if (db[i]["timestamp"] == timestamp){
      return i;
    }
  }
  return undefined;
}


//-----------------------------------------------------------------------//
// add POST
router.post('/', function(req, res){
  console.log('POST storico');
  let code = 503;
  let json = req.body;
  let id = json["id"];
  let timestamp = json["timestamp"];
  let esercizi = json["esercizi"];
  let ripetizioni = json["ripetizioni"];
  if (id && timestamp && esercizi && ripetizioni && esercizi.length > 0 && esercizi.length == ripetizioni.length){
    if (!storicoDB[id]){
      storicoDB[id] = [];
    }
    if (!contains_time(storicoDB[id], timestamp)){
      o = {
        "timestamp" : timestamp,
        "esercizi" : esercizi,
        "ripetizioni" : ripetizioni
      };
      storicoDB[id].push(o);

      code = 200;
      res.response={
        success: "Added " + size(esercizi) + " exercises."
      };
    } else {
      code = 409;
      res.response={
        error: "Data already exists."
      };
    }
  } else {
    res.response={
      error: "Error. Something is wrong with data you passed."
    };
    code = 422;
  }

  res.status(code);
  res.send(res.response);
});

// get storico GET
router.get('/:id/:data_inizio/:data_fine', function(req, res){
    console.log('GET storico');
    let id = req.params.id;
    let data_inizio = req.params.data_inizio;
    let data_fine = req.params.data_fine;
    let storico = [];
    if (id && data_inizio && data_fine && data_fine > data_inizio){
      for (let i = 0; i < storicoDB[id].length; i++){
        let time = storicoDB[id][i]["timestamp"];
        if (time >= data_inizio && time <= data_fine){
          storico.push(storicoDB[id][i]);
        }
      }
      if (storico.length == 0){
        code = 404;
        res.response={error:"Storico not found"};
      } else {
        code = 200;
        res.response={
          storico : storico
        };
      }
    } else {
      code = 422;
      res.response={error:"Error. id or dates are INVALID"};
    }

    res.status(code);
    res.send(res.response);
});

// update data PUT
router.put('/', function(req, res){
  console.log('PUT storico');
  let code = 503;
  let sent = [];
  let json = req.body;
  let id = json["id"];
  let timestamp = json['timestamp'];
  let update = json['update'];
  if (id && timestamp && update && update["esercizi"].length > 0 && update["esercizi"].length == update["ripetizioni"].length){
    if (contains_time(storicoDB[id], timestamp)){
      for (let i = 0; i < update["esercizi"].length; i++){
        let index = get_index_storico_data(storicoDB[id], timestamp)
        let val = storicoDB[id][index]["esercizi"];
        if (val && update["ripetizioni"][i] >= 0){
          let j = val.indexOf(update["esercizi"][i]);
          storicoDB[id][index]["ripetizioni"][j] = update["ripetizioni"][i]
        } else {
          console.log('Error. Unexpected value: ' + key + ' ' + update[key]);
          sent.push(key);
        }
      }
    }
    if (sent.length == 0){
      res.response={
        done : 'Update completed.'
      };
      code = 200;
    } else {
      res.response={
        error : "All values are modified except for: " + sent + "."
      };
      code = 200;
    }
  } else {
    res.response={
      error : 'Error. id or data or esercizi are INVALID'
    };
    code = 422;
  }

  res.status(code)
  res.json(res.response);
});

// delete data DELETE
router.delete('/', function(req, res){
  console.log('DELETE storico');
  let code = 503;
  let json = req.body;
  let id = json["id"];
  let data_to_del = json['data_to_del'];
  if (id && data_to_del){
    if (storicoDB[id] && contains_time(storicoDB[id], data_to_del)){
      let index = get_index_storico_data(storicoDB[id], data_to_del);
      storicoDB[id].splice(index, 1);
      res.response={
        delete: 'Del completed'
      };
      code = 200;
    } else {
      res.response={
        delete: 'Data to del NOT FOUND'
      };
      code = 404;
    }
  } else {
    res.response={
      error : 'Error. id or data to del are INVALID'
    };
    code = 422;
  }
  res.status(code);
  res.json(res.response);
});

module.exports = router;