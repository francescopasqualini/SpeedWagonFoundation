const express = require('express');
const app = express();

const port =  process.env.PORT ||  3000;

app.use(express.json());

const infoRouter = require('./routes/APIInfo');
app.use('/info', infoRouter);
//const infoRouter = require('./routes/APIschede');
//app.use('/schede', infoRouter);

app.get('/', function(req, res){
  res.status(200);
  res.json(
    {
      FrancescoPavanello: "/info",
      LucaStaboli: "/schede" 
    })
})

app.listen(port, function() {
  console.log('Server running on port ', port);
});