const express = require("express");
const app = express();
app.use(express.json());
const path = require('path');

// Configurar pasta para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


app.get("/login", (req, res) =>{
   res.sendFile('./public/pages-login.html', {root: __dirname});
});

app.post("/login", (req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
 });

 app.get('/home', (req,res) => {
    res.sendFile('./public/index.html', {root: __dirname});
});

// Redirecionamento
app.get('/', (req,res) => {
    res.redirect('/home');
});

// 404
app.use((req,res) => {
    res.status(404).sendFile('./public/pages-error-404.html', {root: __dirname});
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});