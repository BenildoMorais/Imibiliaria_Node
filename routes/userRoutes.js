const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../config/multer');
const userController = require('../controllers/userController');

router.get('/Criar', userController.user_criar_get);

router.post('/Criar', upload.single('imagem'), userController.user_criar_post);

router.get('/Listar', userController.user_listar);

router.delete('/Apagar/:id', userController.user_apagar);

router.get('/Perfil', userController.user_perfil);

router.get('/Perfil/:id', userController.list_user_perfil);

module.exports = router;