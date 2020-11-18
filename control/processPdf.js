const pdfreader = require("pdfreader");

module.exports.parsePdf = function (path) {
  new pdfreader.PdfReader().parseFileItems(path, function(err, item) {
    if (err) console.log('error');
    else if (!item) processPdfInfo(null);
    else if (item.text) {  /*console.log(item.text);*/
      console.log(item.y);
      console.log(item.text);
    }
  });
}


function processPdfInfo (info) {
  console.log('Pprocessamento do PDF finalizado com sucesso!');
}

