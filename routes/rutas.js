const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
});

const cargarImagen = multer({
  storage,
  limits: { fileZise: 1000000 }
}).single("image");

router.post("/elmejorgrupo", (req, res) => {
  cargarImagen(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(req.file);
    res.send('Imagen cargada!');
  });
});

module.exports = router;
