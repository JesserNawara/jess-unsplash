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

app.post('/addlabel', function(req, res){
  const label = req.body.label;
  db.query('INSERT INTO items (photo, label) VALUES (?, ?)', 
    label,
  (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  }
  )
})

app.delete('/item/delete:id', function (req, res){
  const id = req.params.id
  db.query('DELETE FROM items WHERE id = ?',id, 
  function (err, result){
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})





