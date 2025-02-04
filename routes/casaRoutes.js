const express = require('express');
const router = express.Router();
const {uploadCasa} = require('../config/multer');
const casaController = require('../controllers/casaController');

router.get('/Criar', casaController.casa_criar_get);

router.post('/Criar', uploadCasa.array('fotos', 15), casaController.casa_criar_post);

router.get('/Detalhes/:id', casaController.casa_detalhes);

router.get('/Listar', casaController.casa_listar);

router.delete('/Apagar/:id', casaController.casa_apagar);

module.exports = router;