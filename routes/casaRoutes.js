const express = require('express');
const router = express.Router();
const casaController = require('../controllers/casaController');

router.get('/Criar', casaController.casa_criar_get);

router.post('/Criar', casaController.casa_criar_post);

router.get('/Listar', casaController.casa_listar);

router.delete('/Apagar/:id', casaController.casa_apagar);

module.exports = router;