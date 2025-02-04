const Condominio = require('../models/condominio');
const app = require('../config/SuporteErros');

const condominio_criar_get = (req,res) => {

    res.render('CriarNovoCondominio', {caminho: 'Novo Usuario'});

};

const condominio_criar_post = (req,res) => {

    const condominio = new Condominio(req.body);

    condominio.save()
    .then((result) => {
        res.redirect('/User/Listar');
    })
    .catch((err) => {
        const errors = app.handleErrors(err);
        res.status(400).json({errors});
    });

    res.redirect('/Condominio/Listar');

};

const condominio_listar = (req,res) => {
    
    res.render('ListarCondominio');
    
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