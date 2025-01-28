const jwt = require('jsonwebtoken');
const app = require('../config/SuporteErros');

const condominio_criar_get = (req,res) => {

    res.render('CriarNovoCondominio', {caminho: 'Novo Usuario'});

};

const condominio_criar_post = (req,res) => {

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