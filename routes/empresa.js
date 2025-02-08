const express = require('express');

const router = express.Router();

const empresaController = require('../controllers/empresa')
const isAuth = require('../middleware/is-auth')

router.get('/nosotros', isAuth, empresaController.getNosotros);
router.get('/faqs', isAuth, empresaController.getSoporte);
router.get('/condiciones-compra', isAuth, empresaController.getCondicionesCompra);
router.get('/accesibilidad', isAuth, empresaController.getAccesibilidad);
router.get('/privacidad', isAuth, empresaController.getPrivacidad);
router.get('/legal', isAuth, empresaController.getLegal);

module.exports = router;