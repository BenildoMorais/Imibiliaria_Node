const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    nomeCompleto: {
        type: String,
        required: [true, 'Por favor insira o nomeCompleto'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Por favor insira o username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Por favor insira o email'],
        lowercase: true,
        validate: [isEmail, 'Por favor insira um email valido']
    },
    imagem: {
        type: String,
        required: false,
    },
    telefone: {
        type: Number,
        required: [true, 'Por favor insira o telefone']
    },
    tipo: {
        type: String,
        required: [true, 'Por favor selecione o tipo']
    },
    password: {
        type: String,
        required: [true, 'Por favor insira o password'],
        unique: true
    }   
}, {timestamps: true});

// Encriptação da password antes do save
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Login do usuario "Método estático"

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    if(user){
     auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('password Incorreta');
    }
    throw Error('username Incorreto');
};

const User = mongoose.model('Users', userSchema);
module.exports = User;