const express = require('express')
const app = express()
const port = 3002
const db = require('../database');
const fileUpload = require('express-fileupload')
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const path = require('path');
app.use(fileUpload());
app.use(express.json())
app.use(express.static(__dirname + "/../build"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))
app.use('/', express.static(path.join(__dirname, '/')));

cloudinary.config({ 
  cloud_name: 'jessssss', 
  api_key: '249939786819951', 
  api_secret: 'M2P3YdCwdXq_3O3UU_R3aHAL88Q',
  secure: true 
});

app.post('/upload', (req, res) => {
  if(req.files === null){
    return res.status(400).json({msg: "no files were uploaded"})
  }
  const file = req.files.file;
  console.log(file);
  cloudinary.uploader.upload(file, (result, error) => {
    if(result){
      res.status(200).json(result);
    } else {
      res.status(500).json(error);
    }
  })
})

// app.post("/api/image", upload.single('image'), (req, res, err) => {
//   if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//     res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})};
//     const image = req.file.filename;
//     const sqlInsert = "UPDATE images SET `image` = ? WHERE id = ?";

//     connection.query(sqlInsert, [image, id], (err, result) => {
//       if(err){
//         console.log(err);
//         res.send({
//           msg: err
//         })
//       }
//       if (result) {
//         res.send({ 
//           data: result,
//           msg: 'Your image has been updated successfully!'
//         })
//       }
//     })
// })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./")},
//     filename: function(req, file, cb) {
//       const ext = file.mimetype.split("/")[1];
//       cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
//     }
// });

// const upload =multer({
//   storage: storage
// })

app.get('/data', function (req, res) {
  const items = req.body.items
  db.query('SELECT * FROM items ORDER BY id DESC',items ,(err, result)=>{
    if (err) {
      res.statusCode(400).send(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/add/item', function(req, res){
  const image = req.body.image
  const label = req.body.label;
  db.query('INSERT INTO items (image,label) VALUES (?,?)', 
    [image, label],
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





