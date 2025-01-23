const User = require('../models/user');
const jwt = require('jsonwebtoken');
//const app = require('../app');
const app = require('../config/SuporteErros');

const maxAge = 2 * 60 * 60; //2h
const createToken = (id) => {
    return jwt.sign({id}, 'B370z', {expiresIn: maxAge});
};

const login_post = async (req,res) => {
    const {username , password} = req.body;
    try {
        const user = await User.login(username, password);
        const token = createToken(username);
        res.cookie('B370z', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id, path: '/'});
    } catch (err) {
        const errors = app.handleErrors(err);
        res.status(400).json({ errors });
    }

}

const login_get = (req,res) => {
    res.render('Login');
}

module.exports = {
    login_post,
    login_get
};