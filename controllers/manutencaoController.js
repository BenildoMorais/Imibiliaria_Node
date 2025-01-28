const jwt = require('jsonwebtoken');
const app = require('../config/SuporteErros');

const manutencao_criar_get = (req,res) => {

    res.render('CriarNovaManutencao', {caminho: 'Novo Usuario'});

};

const manutencao_criar_post = (req,res) => {

    res.redirect('/Manutencao/Listar');

};

const manutencao_listar = (req,res) => {
    
    res.render('ListarManutencoes');
    
};

const manutencao_apagar = (req,res) => {

    res.redirect('/Manutencao/Listar');
    
}

module.exports = {
    manutencao_criar_get,
    manutencao_criar_post,
    manutencao_listar,
    manutencao_apagar
};