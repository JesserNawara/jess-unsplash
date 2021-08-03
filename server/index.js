const express = require('express')
const app = express()
const port = 5000
const db = require('../database');

app.use(express.json())
app.use(express.static(__dirname + "/../build"));
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





//                 WC break 