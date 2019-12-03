var express = require('express');
var app = express();
app.use(express.json());
const port = 3000;


var loginDatabase={perna:"password", crispo:"12345", fausto:"qwerty"}
// Handling GET requests
/*app.get('/', function(req, res) {
  res.send('Hello World!');
});
app.get('/perna', function(req, res) {
    res.send('Hello World perna!');
  });*/
app.post('/login', (req, res) => {
    var payload = req.body
    var nomeDato = payload["username"]; 
    var passwordData = payload["password"]
    if (typeof(nomeDato) === "undefined" || typeof(passwordData) === "undefined") {
        res.send("json formattato male")
    }
    else {
        var passwordVera = loginDatabase[nomeDato]
        if (typeof(passwordVera)=="undefined") {
            res.send("utente non trovato")
        }
        else
        {
            if (passwordData == passwordVera) {
                res.send("login eseguito")
            }
            else{
                res.send("utente o password sbagliati")
            }
        }
    }   
    
});/*
app.get('/param', function(req, res) {
    var jacopo = req.query.nome;
    if (jacopo == "jacopo"){
        res.send('Hello World not jacopo! '.concat(req.query.nome));
    }
    else{
        let prova=req.query.a+"";
        res.send('Hello World jacopo! '.concat(prova));
    }
  });
*/
app.listen(port, function() {
  console.log('Server running on port ', port);
});