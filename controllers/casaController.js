const jwt = require('jsonwebtoken');
const app = require('../config/SuporteErros');

const casa_criar_get = (req,res) => {

    res.render('CriarNovaResidencia', {caminho: 'Novo Usuario'});

};

const casa_criar_post = (req,res) => {

    res.redirect('/Casa/Listar');

};

const casa_listar = (req,res) => {
    
    res.render('ListarResidencia');
    
};

const casa_apagar = (req,res) => {

    res.redirect('/Casa/Listar');
    
}

module.exports = {
    casa_criar_get,
    casa_criar_post,
    casa_listar,
    casa_apagar
};