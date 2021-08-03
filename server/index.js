const express = require('express')
const app = express()
const port = 5000
const db = require('../database');

app.use(express.json())
app.use(express.static(__dirname + "/../build"));
app.use(express.urlencoded({ extended: true }));

app.get('/data', function (req, res) {
  const items = req.body.items
  db.query('SELECT * FROM items ',items ,(err, result)=>{
    if (err) {
      res.statusCode(400).send(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/addPhoto', function(req, res){
  const photo= req.body.photo;
  const label = req.body.label;
console.log(req.body);
  db.query('INSERT INTO items (photo, label) VALUES (?, ?)', 
    [photo,label],
  (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  }
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})





