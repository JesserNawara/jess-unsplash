const express = require('express')
const app = express()
const port = 3001
const db = require('../database');

const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;


app.use(express.json())
app.use(express.static(__dirname + "/../build"));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))
   
cloudinary.config({ 
  cloud_name: 'jessssss', 
  api_key: '249939786819951', 
  api_secret: 'M2P3YdCwdXq_3O3UU_R3aHAL88Q',
  secure: true 
});

//___________________________FETCH_ITEMS_________________________
app.get('/data', function (req, res) {
  const items = req.body.items
  db.query('SELECT * FROM items ORDER BY id DESC',items ,(err, result)=>{
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result);
    }
  })
})

//_________________________DELETE_ITEM___________________________
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

//__________________________MULTER_STORAGE________________________
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./")},
    filename: function(req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
    }
});

const upload =multer({ storage: storage })

//___________________________________UPLOAD_IMAGE__________________
app.post("/upload", upload.single('image'), (req, res, err) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})};

    const image = req.file.filename;

    cloudinary.uploader.upload(image, (error, response) => {
      const sqlInsert = "INSERT INTO items (image, label) VALUES(?,?)";
      const label = req.body.label
      const image = response.secure_url;
      db.query(sqlInsert, [image, label], (err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(result);
        }
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})





