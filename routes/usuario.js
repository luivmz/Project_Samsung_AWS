const express = require('express');
const { check, body } = require('express-validator');
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario');

const router = express.Router();

const usuarioController = require('../controllers/usuario')


router.post('/login',
    [
        body('email')
            .notEmpty()
            .withMessage('Por favor ingrese un email')
            .isEmail()
            .withMessage('Por favor ingrese un email válido')
            .bail()
            .normalizeEmail({ gmail_remove_dots: false })
            .custom(async (value, { req }) => {
                const usuario = await Usuario.findOne({ email: value });

                if (!usuario) {
                    return Promise.reject('El usuario no existe');
                }

                req.usuario = usuario;
            }),
        body('password', 'Por favor ingrese una contraseña que tenga letras o números y no menos de 8 caracteres')
            .trim()
            .isLength({ min: 8 })
            .matches(/^[A-Za-z0-9_@.\/#$&+-@*]*$/)
            .custom(async (value, { req }) => {
                const usuario = req.usuario;

                const result = await bcrypt.compare(value, usuario.password);
                if (!result) {
                    return Promise.reject('Las credenciales son inválidas');
                }

                return true;
            }),
    ]
    , usuarioController.postLogin);
router.post('/logout', usuarioController.postLogout);
router.post(
    '/signup',
    [
        body('nombres')
            .trim()
            .customSanitizer((value) => value.replace(/\s+/g, ' '))
            .notEmpty().withMessage('El nombre no puede estar vacío')
            .matches(/^[a-zA-Z\s]+$/).withMessage('El nombre solo debe contener letras'),
        body('apellidos')
            .trim()
            .customSanitizer((value) => value.replace(/\s+/g, ' '))
            .notEmpty().withMessage('El apellido no puede estar vacío')
            .matches(/^[a-zA-Z\s]+$/).withMessage('El apellido solo debe contener letras'),
        check('email')
            .isEmail()
            .withMessage('Por favor ingrese un correo válido')
            .normalizeEmail()
            .custom((value, { req }) => {
                return Usuario.findOne({ email: value }).then(usuarioDoc => {
                    if (usuarioDoc) {
                        return Promise.reject('El email ingresado ya existe');
                    }
                });
            }),
        body(
            'password',
            'Por favor ingrese una contraseña que tenga letras o números y no menos de 8 caracteres.'
        )
            .trim()
            .isLength({ min: 8 })
            .matches(/^[A-Za-z0-9_@.\/#$&+-@*]*$/),
        body('password2')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Las contraseñas no coinciden');
                }
                return true;
            }),
        ],
    usuarioController.postSignup
);
router.post('/reset-password', usuarioController.postResetPassword);
router.post('/new-password', usuarioController.postNewPassword);

router.get('/login', usuarioController.getLogin);
router.get('/signup', usuarioController.getSignup);
router.get('/reset-password', usuarioController.getResetPassword);
router.get('/reset-password', usuarioController.getResetPassword);
router.get('/reset-password/:token', usuarioController.getNewPassword);

module.exports = router;
