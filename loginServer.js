var express = require('express');
var app = express();
app.use(express.json());
const port = 3000;


var loginDatabase={processo:{password: "password",name:"bruno",surname:"crispo",email:"example@mail.com",isPt: "true"}, mongodb:{password: "12345",name:"gino",surname:"perna",email:"example@mail.com",isPt: "false"}, monkeyEatedBanana:{password: "qwety",name:"fausto",surname:"giunchiglia",email:"example@mail.com",isPt: "true"}}
app.post('/login', (req, res) => {
    var payload = req.body
    var nomeDato = payload["username"]; 
    var passwordData = payload["password"]
    if (nomeDato == undefined || passwordData == undefined) {
        let risposta = {error:"json bad formed"}
        res.json(risposta)
    }
    else {
        try {
            var passwordVera = loginDatabase[nomeDato].password
        } catch (error) {
            let risposta = {error:"username or password wrong"}
            res.json(risposta)
        }
        if (passwordData==passwordVera) {
            let risposta={name:loginDatabase[nomeDato].name, surname:loginDatabase[nomeDato].surname,email:loginDatabase[nomeDato].email, isPt:loginDatabase[nomeDato].isPt}
            res.json(risposta)
        }
        else{
            let risposta = {error:"username or password wrong"}
            res.json(risposta)
        }
            
    }   
    
});
app.listen(port, function() {
  console.log('Server running on port ', port);
});