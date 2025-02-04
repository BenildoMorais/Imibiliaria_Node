const multer = require('multer');

const storagePerfil = multer.diskStorage({
    destination: function(req, imagem, cb){
        cb(null, './public/img/user');
    },
    filename: function(req, imagem, cb){
        cb(null, Date.now() + imagem.originalname);
    }
});

const storageCasa = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/casas');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

const uploadPerfil = multer({storage: storagePerfil});
const uploadCasa = multer({storage: storageCasa});

module.exports = { uploadPerfil, uploadCasa };