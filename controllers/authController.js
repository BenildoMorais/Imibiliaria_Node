const User = require('../models/user');
const jwt = require('jsonwebtoken');

const maxAge = 2 * 60 * 60; //2h
const createToken = (id) => {
    return jwt.sign({id}, 'B370z', {expiresIn: maxAge});
};

const init = (req,res) => {
    if(true){
        res.render('index');
    }else{
        res.redirect('/Login');
    }
}

const login_post = async (req,res) => {
    const {username , password} = req.body;
    
    try {
        const user = await User.login(username, password);
        res.status(200).json({user: user._id});
    } catch (err) {
        res.status(400).json({});
    }


    //const token = createToken(username);
    //res.cookie('B370z', token, {httpOnly: true, maxAge: maxAge * 1000});
    //res.status(201).json({password});
}

const login_get = (req,res) => {
    res.render('Login');
}




module.exports = {
    init,
    login_post,
    login_get
};