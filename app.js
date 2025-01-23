const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

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
app.use('/public', express.static(__dirname + '/public'));

// middleware para receber os ficheiros com post
app.use(express.urlencoded({extended : true}));

// middleware para visualizar os logs
app.use(morgan('dev'));

// middleware para cookies
app.use(cookieParser());

app.get('/home', (req,res) => {
    res.render('index');
});

// Redirecionamento
/*app.get('/', (req,res) => {
    res.redirect('/Login');
});
*/

// userRoutes
app.use('/User',userRoutes);

// authRoutes
app.use('/',authRoutes);

// cookies
/*app.get('/set-cookies', (req,res) => {
    // Mais logo fazer com que só funcione em https
    res.cookie('novoUsuario', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send('recebeste os cookies');
});

app.get('/read-cookies', (req,res) => {
    const cookie = req.cookies;
    console.log(cookie);
});
*/

// 404
app.use((req,res) => {
    res.status(404).render('Error404');
});
