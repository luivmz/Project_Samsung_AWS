const express = require('express');

const router = express.Router();

const productosController = require('../controllers/productos')
const isAuth = require('../middleware/is-auth')

router.get('/carrito', isAuth, productosController.getCarrito);
router.post('/carrito', isAuth, productosController.postCarrito)
router.get('/api/carrito',isAuth, productosController.getCarritoDesplegable); // info para el carrito
router.post('/eliminar-producto-carrito', isAuth, productosController.postEliminarProductoCarrito);
// router.get('/categoria/:categoria_ruta?', isAuth, productosController.getProductosSorted);
// router.get('/categoria/:categoria_ruta', isAuth, productosController.getProductos);
router.get('/', isAuth, productosController.getHome);
router.post('/modificar-cantidad-carrito', isAuth, productosController.modificarCantidadCarrito);

// POR QUE LA RUTA DE CATEGORIA LLAMA AL HOME????
// KEEEEEE??????????????????????????
router.get('/categoria/:categoria_ruta', productosController.getHome);
router.get('/', productosController.getHome);
router.get('/productos/:idProducto', productosController.getProducto);

router.get('/pedidos', isAuth, productosController.getPedidos);
router.post('/crear-pedido', isAuth, productosController.postPedido);
router.get('/pedidos/:idPedido', isAuth, productosController.getComprobante);

module.exports = router;