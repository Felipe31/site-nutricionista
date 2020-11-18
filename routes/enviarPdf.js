const express = require('express');
const path = require('path');
const processPdf = require('../control/processPdf');

const multer  = require('multer')
const storage = multer.diskStorage ({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname);
    cb(null, "s.pdf");
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.pdf') {
      return cb(null, false);
    }
    cb(null, true);
  }});
const router = express.Router();


router.post('/', upload.single('file'), (req, res) => {
  console.log('arquivo!');
  if (req.file) {
    console.log(req.file.filename);
    console.log(req.file.filename);
    console.log(req.file.encoding);
    console.log(req.file.originalname);
    console.log(req.file.path);

    processPdf.parsePdf(req.file.path);


    return res.status(202).send({'message' : 'Upload realizado com sucesso!'});
  }

  return res.status(400).send({'error' : 'O arquivo deve ser do formato PDF!'});
});

module.exports = router;

// TODO
//
// OK - Envio de arquivos PDF
// - Recuperar link do arquivo para processamento
// - Converter pdf em texto