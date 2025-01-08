const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');
const dotenv = require('dotenv');
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

app.use(morgan('dev'));

app.get('/addUser', (req,res) => {
    const user = new User({
        nomeCompleto: 'Felizardo Rui Samito',
        username: 'FelizardoSamito',
        email: 'qualquercoisa@gmail.com',
        telefone: 87000000,
        tipo: 'Proprietario',
        password: '0000'
    });

    user.save()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

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

app.get('/ListarUsuarios', (req,res) => {
    User.find().sort({ createAt: -1})
    .then((result) => {
        res.render('ListarUsuarios', {caminho: 'Lista de Usuarios', users : result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/PerfilUsuario', (req,res) => {
    res.render('PerfilUsuario', {caminho: 'Perfil do Usuario'});
});

// 404
app.use((req,res) => {
    res.status(404).render('Error404');
});
