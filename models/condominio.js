const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const condominioSchema = new Schema({

    codigo: {
        type: String,
        required: [true, 'Por favor insira o username'],
    },
    casas: {
        type: [String],
        required: [true, 'Por favor insira o email']
    }
  
}, {timestamps: true});


const Condominio = mongoose.model('Condominio', condominioSchema);
module.exports = Condominio;