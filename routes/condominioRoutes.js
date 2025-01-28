const express = require('express');
const router = express.Router();
const condominioController = require('../controllers/condominioController');

router.get('/Criar', condominioController.condominio_criar_get);

router.post('/Criar', condominioController.condominio_criar_post);

router.get('/Listar', condominioController.condominio_listar);

router.delete('/Apagar/:id', condominioController.condominio_apagar);

module.exports = router;