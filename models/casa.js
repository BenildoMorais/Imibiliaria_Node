const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casaSchema = new Schema({
    localizacao: {
        type: String,
        required: [true, 'Por favor insira a localização'],
    },
    descricao: {
        type: String,
        required: [true, 'Por favor insira os detalhes da casa'],
    },
    proprietario: {
        type: String,
        required: [true, 'Por favor indique o proprierario da residencia'],
    },
    renda: {
        type: Number,
        required: [true, 'Por favor insira a renda']
    },
    fotos: {
        type: [String],
        required: [true, 'Por favor insira a renda']
    },
    numeroQuartos: {
        type: Number,
        required: [true, 'Por favor insira o numdero de quartos'],
    }   
}, {timestamps: true});

const Casa = mongoose.model('Casas', casaSchema);
module.exports = Casa; 