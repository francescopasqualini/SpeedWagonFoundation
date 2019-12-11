const express = require('express');
const app = express();

const port =  process.env.PORT ||  3000;

app.use(express.json());

app.listen(port, function() {
  console.log('Server running on port ', port);
});

const infoRouter = require('./routes/APIInfo');
app.use('/info', infoRouter);

app.get('/', function(req, res){
  res.status(200);
  res.json({sectionAvaible: "/info"})
})