const express = require('express');
const app = express();

const port =  process.env.PORT ||  3000;

app.use(express.json());
app.use(bodyParser.json());

const infoRouter = require('./routes/APIInfo');
app.use('/info', infoRouter);
const schedeRouter = require('./routes/APIschede');
app.use('/schede', schedeRouter);
const storicoRouter = require('./routes/APIstorico');
app.use('/storico', storicoRouter);
const lionRouter = require('./routes/ApiUsersChatLion');
app.use('/', lionRouter);

app.get('/', function(req, res){
  res.status(200);
  res.json(
    {
      FrancescoPavanello: "/info",
      LucaStaboli: "/schede",
      FrancescoPasqualini: "/storico"
    })
})

app.listen(port, function() {
  console.log('Server running on port ', port);
});
