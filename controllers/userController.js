const User = require('../models/user');

const user_criar_get = (req,res) => {
    res.render('CriarNovoUsuario', {caminho: 'Novo Usuario'});
}

const user_criar_post = (req,res) => {
    const imagem = req.file;

    const user = new User(req.body);

    user.imagem = '/'+imagem.path.replace(/\\/g, '/');

    user.save()
    .then((result) => {
        res.redirect('/User/Listar');
    })
    .catch((err) => {
        console.log(err);
    });
}

const user_listar = (req,res) => {
    User.find().sort({ createAt: -1})
    .then((result) => {
        res.render('ListarUsuarios', {caminho: 'Lista de Usuarios', users : result});
    })
    .catch((err) => {
        console.log(err);
    });
}

const user_apagar = (req,res) => {
    const id = req.params.id;
    
    User.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/User/Listar'});
    })
    .catch((err) => {
        console.log(err);
    });

}

const user_perfil = (req,res) => {
    const id = req.params.id;
    User.findById(id)
    .then((result) => {
        res.render('PerfilUsuario', {caminho: 'Perfil do Usuario', result});
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    user_criar_get,
    user_criar_post,
    user_listar,
    user_apagar,
    user_perfil
};