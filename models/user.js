const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nomeCompleto: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    imagem: {
        type: String,
        required: false,
    },
    telefone: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model('Users', userSchema);
module.exports = User;

