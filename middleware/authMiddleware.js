const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {

    const token = req.cookies.B370z

    // Verificação do token
    if (token) {
        jwt.verify(token, 'B370z', (err, decodedToken) => {
            if (err){
                console.log(err.message);
                console.log('Falha na verificação do token');
                res.redirect('/Login');
            }else{
                console.log(decodedToken);
                next();
            };
        });
    }else{
        console.log('Não existe token');
        res.redirect('/Login');
    };

};

// Verificação do usuario logado
    const checkUser = (req, res, next) => {
        const token = req.cookies.B370z

        if (token) {
            jwt.verify(token, 'B370z', async (err, decodedToken) => {
                if (err){
                    console.log(err.message);
                    console.log('Falha na verificação do usuario');
                    res.locals.user = null;
                    netx();
                }else{
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                };
            });
        } else {
            res.locals.user = null;
            next();
        }

    };


module.exports = { requireAuth, checkUser };