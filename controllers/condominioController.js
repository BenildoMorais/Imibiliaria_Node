const Condominio = require('../models/condominio');
const Casa = require('../models/casa');
const app = require('../config/SuporteErros');

const condominio_criar_get = (req,res) => {

    Casa.find().sort({ createAt: -1})
    .then((result) => {
        res.render('CriarNovoCondominio', { casas : result});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
    });

};

const condominio_criar_post = (req,res, next) => {

    var condominio = new Condominio(req.body);

    condominio.casas = req.body.casas.split(",");
    
    console.log(req.body.casas);

    condominio.save()
    .then((result) => {
        res.redirect('/Condominio/Listar');
    })
    .catch((err) => {
        const errors = app.handleErrors(err);
        res.status(400).json({errors});
    });

};

const condominio_listar = (req,res) => {
    
    Condominio.find().sort({ createAt: -1})
    .then((result) => {
        res.render('ListarCondominio', { condominios : result});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
    });
    
};

const condominio_apagar = (req,res) => {

    res.redirect('/Condominio/Listar');
    
}

module.exports = {
    condominio_criar_get,
    condominio_criar_post,
    condominio_listar,
    condominio_apagar
};