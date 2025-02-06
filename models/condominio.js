const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const condominioSchema = new Schema({

    codigo: {
        type: String,
        required: [true, 'Por favor insira um Codigo para o Condominio'],
    },
    casas: {
        type: [String],
        required: [true, 'Por favor selecione pelomenos uma casa']
    }
  
}, {timestamps: true});


const Condominio = mongoose.model('Condominio', condominioSchema);
module.exports = Condominio;