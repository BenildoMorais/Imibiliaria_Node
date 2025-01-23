const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 5000;
const { requireAuth } = require('./middleware/authMiddleware');
const app = express();

dotenv.config({path: 'config.env'});

// Register view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.json());

// middleware para ficheiros estáticos
app.use('/public', express.static(__dirname + '/public'));

// middleware para receber os ficheiros com post
app.use(express.urlencoded({extended : true}));

// middleware para visualizar os logs
app.use(morgan('dev'));

// middleware para cookies
app.use(cookieParser());

// conecção a MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
.then((result) => app.listen(PORT, () => {
    console.log("Server started on port 5000");
}))
.catch((err)=> console.log(err));

// home page
app.get('/', requireAuth, (req,res) => {
    res.render('index');
});

// Redirecionamento
app.get('/home', requireAuth, (req,res) => {
    res.redirect('/');
});

// authRoutes
app.use('/', authRoutes);

// userRoutes
app.use('/User', requireAuth, userRoutes);

// 404
app.use((req,res) => {
    res.status(404).render('Error404');
});
