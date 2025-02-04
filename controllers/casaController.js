const User = require('../models/user');
const Casa = require('../models/casa');
const app = require('../config/SuporteErros');


const casa_criar_get = (req,res) => {
    let users;
    User.find().sort({ createAt: -1})
    .then((result) => {
        users = result;
        res.render('CriarNovaResidencia', {caminho: 'Novo Usuario', users});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Usuarios não encontrados');
    });

};

const casa_criar_post = async (req,res) => {

    try {
        const casa = new Casa(req.body);

        console.log(req.files);
        console.log(req.body);

        if (req.files && req.files.length > 0) {
            casa.fotos = req.files.map(file => '/' + file.path.replace(/\\/g, '/'));
        }
        await casa.save();

        res.redirect('/Casa/Listar');
    } catch (err) {
        const errors = app.handleErrors(err);
        res.status(400).json({ errors });
    }

};

const casa_detalhes = (req,res) => {
    const id = req.params.id;
    Casa.findById(id)
    .then((result) => {
        res.render('DetalhesCasa', {result});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
    });
}

const casa_listar = (req,res) => {
    Casa.find().sort({ createAt: -1})
    .then((result) => {
        res.render('ListarResidencias', { casas : result});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
    });
    
};

const casa_apagar = (req,res) => {

    const id = req.params.id;
    
    Casa.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/Casa/Listar'});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
    });    
}

module.exports = {
    casa_criar_get,
    casa_criar_post,
    casa_listar,
    casa_apagar,
    casa_detalhes
};