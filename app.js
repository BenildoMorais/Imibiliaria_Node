const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
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

// userRoutes
app.use('/User',userRoutes);

// 404
app.use((req,res) => {
    res.status(404).render('Error404');
});
