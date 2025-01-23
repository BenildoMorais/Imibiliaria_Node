const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    const token = req.cookies.B370z

    // Verificação do token
    if (token) {
        jwt.verify(token, 'B370z', (err, decodedToken) => {
            if (err){
                console.log(err.message);
                console.log('Falha na verificação');
                res.redirect('/Login');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        console.log('Não existe a verificação');
        res.redirect('/Login');
    }

}

module.exports = { requireAuth };