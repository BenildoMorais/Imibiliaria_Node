const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');

const manutencaoSchema = new Schema({

    username: {
        type: String,
        required: [true, 'Por favor insira o username'],
    },
    email: {
        type: String,
        required: [true, 'Por favor insira o email'],
        lowercase: true,
        validate: [isEmail, 'Por favor insira um email valido']
    },
    assunto: {
        type: String,
        required: false,
    },
    mensagem: {
        type: String,
        required: [true, 'Por favor selecione o tipo']
    }
  
}, {timestamps: true});


const Manutencao = mongoose.model('Manutencao', manutencaoSchema);
module.exports = Manutencao;