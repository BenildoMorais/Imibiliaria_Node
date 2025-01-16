const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, imagem, cb){
        cb(null, './public/img/user')
    },
    filename: function(req, imagem, cb){
        cb(null, Date.now() + imagem.originalname)
    }
});

const upload = multer({storage});

module.exports = upload;