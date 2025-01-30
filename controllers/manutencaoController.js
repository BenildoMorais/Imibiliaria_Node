const jwt = require('jsonwebtoken');
const app = require('../config/SuporteErros');
const Manutencao = require('../models/manutencao');

const manutencao_criar_get = (req,res) => {

    res.render('CriarNovaManutencao', {caminho: 'Novo Usuario'});

};

const manutencao_criar_post = (req,res) => {

    const manutencao = new Manutencao(req.body);

    manutencao.save()
        .then((result) => {
            res.redirect('/Manutencao/Listar');
        })
        .catch((err) => {
            const errors = app.handleErrors(err);
            res.status(400).json({errors});
        });

};

const manutencao_listar = (req,res) => {
    Manutencao.find().sort({ createAt: -1})
    .then((result) => {
        res.render('ListarManutencoes', { manutencoes : result});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
    });
    
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