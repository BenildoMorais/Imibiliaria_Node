const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');

router.get('/Criar', manutencaoController.manutencao_criar_get);

router.post('/Criar', manutencaoController.manutencao_criar_post);

router.get('/Listar', manutencaoController.manutencao_listar);

router.delete('/Apagar/:id', manutencaoController.manutencao_apagar);

module.exports = router;