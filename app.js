const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const upload = require('./config/multer');
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 5000;

// conecção a MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
.then((result) => app.listen(PORT, () => {
    console.log("Server started on port 5000");
}))
.catch((err)=> console.log(err));

// Register view engine
app.set('view engine', 'ejs');


// middleware para ficheiros estáticos
app.use(express.static('views'));

// middleware para receber os ficheiros com post
app.use(express.urlencoded({extended : true}));

app.use(morgan('dev'));

    // Para upload de imagens
    //const upload = multer({ dest: './views/assets/img/user' });


app.get('/login', (req,res) => {
    res.render('Login');
});

app.get('/home', (req,res) => {
    res.render('index');
});

// Redirecionamento
app.get('/', (req,res) => {
    res.redirect('/Login');
});

app.get('/CriarUsuario', (req,res) => {
    res.render('CriarNovoUsuario', {caminho: 'Novo Usuario'});
});

app.post('/CriarUsuario', upload.single('imagem'), (req,res) => {

    const imagem = req.file;

    const user = new User(req.body);

    user.imagem = imagem.path.replace(/^views[\\/]/, '').replace(/\\/g, '/');

    user.save()
    .then((result) => {
        res.redirect('/ListarUsuarios')
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/ListarUsuarios', (req,res) => {
    User.find().sort({ createAt: -1})
    .then((result) => {
        res.render('ListarUsuarios', {caminho: 'Lista de Usuarios', users : result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.delete('/ApagarUsuario:id', (req,res) => {
    const id = req.params.id;

    
    User.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/ListarUsuarios'});
    })
    .catch((err) => {
        console.log(err);
    });

});

app.get('/PerfilUsuario', (req,res) => {
    //res.render('PerfilUsuario', {caminho: 'Perfil do Usuario'});
    res.redirect('/home');
});

app.get('/PerfilUsuario:id', (req,res) => {
    const id = req.params.id;
    User.findById(id)
    .then((result) => {
        res.render('PerfilUsuario', {caminho: 'Perfil do Usuario', result});
    })
    .catch((err) => {
        console.log(err);
    });

});

// 404
app.use((req,res) => {
    res.status(404).render('Error404');
});
