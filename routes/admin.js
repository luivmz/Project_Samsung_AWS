const express = require('express');
const { check, body } = require('express-validator');

const router = express.Router();

const adminController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth');

router.get('/admin-dashboard', isAuth, adminController.getAdminDashboard);
router.get('/crear-producto', isAuth, adminController.getCrearProducto);

// router.get('/productos?', isAuth, adminController.getProductosSorted);
router.get('/productos', isAuth, adminController.getProductos);


// Categorias Administrator
router.get('/categorias', isAuth, adminController.getCategorias);
router.post('/categorias',
    [
        body('categoria', 'El nombre de la categoría debe tener al menos 3 caracteres').trim().isLength({ min: 3 }),
        body('orden', 'El orden debe ser un número').isInt({ min: 1 }) // Verifica que el orden sea un número mayor o igual a 1
    ],
    isAuth,
    adminController.postCategoria
);
router.post('/categorias/eliminar/:id', isAuth, adminController.postEliminarCategoria); // Elimina categorías

// Cambia la ruta de editar producto para incluir el ID del producto
router.get('/editar-producto/:id', isAuth, adminController.getEditProductos);

router.post('/crear-producto',
    [
        body('nombreproducto', 'El nombre del producto debe ser un texto de no menos de 3 caracteres')
            .trim()
            .isString()
            .isLength({ min: 3 }),
            // BORRAR COMPROBACION
            // PARFAVAAAAAAAAAAAAAAR
        body('urlImagen', 'Ingrese un URL válido')
            .isURL(),
        body('precio', 'El precio debe ser un número')
            .isFloat(),
        body('descripcion', 'La descripción debe ser un texto de entre 10 a 400 caracteres')
            .trim()
            .isLength({ min: 10, max: 400 }),
        body('caracteristicas', 'Las caracteristicas deben estar entre 10 a 300 caracteres')
            .trim()
            .isString()
            .isLength({ min: 10, max: 300 }),
    ],
    isAuth,
    adminController.postCrearProducto);

router.post('/editar-producto',
    [
        body('nombreproducto', 'El nombre del producto debe ser un texto de no menos de 3 caracteres')
            .trim()
            .isString()
            .isLength({ min: 3 }),
        // body('urlImagen', 'Ingrese un URL válido')
            // .isURL(),
        body('precio', 'El precio debe ser un número')
            .isFloat(),
        body('descripcion', 'La descripción debe ser un texto de entre 10 a 400 caracteres')
            .trim()
            .isLength({ min: 10, max: 400 }),
        body('caracteristicas', 'Las caracteristicas deben estar entre 10 a 300 caracteres')
            .trim()
            .isString()
            .isLength({ min: 10, max: 300 }),
    ],
    isAuth,
    adminController.postEditProductos);
router.post('/eliminar-producto', isAuth, adminController.postEliminarProducto);


module.exports = router;