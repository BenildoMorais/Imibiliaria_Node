const User = require('../models/user');
const jwt = require('jsonwebtoken');
const app = require('../config/SuporteErros');

const user_criar_get = (req,res) => {
    res.render('CriarNovoUsuario', {caminho: 'Novo Usuario'});
}

const user_criar_post = (req,res) => {
    const imagem = req.file;
    console.log(req.file);

    const user = new User(req.body);

    if (imagem && imagem.path) {
        user.imagem = '/'+imagem.path.replace(/\\/g, '/');
    };

    user.save()
    .then((result) => {
        res.redirect('/User/Listar');
    })
    .catch((err) => {
        const errors = app.handleErrors(err);
        res.status(400).json({errors});
    });
}

const user_listar = (req,res) => {
    User.find().sort({ createAt: -1})
    .then((result) => {
        res.render('ListarUsuarios', {caminho: 'Lista de Usuarios', users : result});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
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
        res.status(500).send('Algo Deu errado');
    });

}

const list_user_perfil = (req,res) => {
    const id = req.params.id;
    User.findById(id)
    .then((result) => {
        res.render('PerfilUsuario', {caminho: 'Perfil do Usuario', result});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Algo Deu errado');
    });
}

const user_perfil = (req,res) => {
    const token = req.cookies.B370z

     // Verificação do token
        if (token) {
            jwt.verify(token, 'B370z', async (err, decodedToken) => {
                if (err){
                    console.log(err.message);
                    console.log('Falha na verificação');
                    res.redirect('/Login');
                }else{
                    res.redirect('Perfil/'+decodedToken.id);
                }
            });
        }else{
            console.log('Não existe a verificação');
            res.redirect('/Login');
        }

}

module.exports = {
    user_criar_get,
    user_criar_post,
    user_listar,
    user_apagar,
    user_perfil,
    list_user_perfil
};