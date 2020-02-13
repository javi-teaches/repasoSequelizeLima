const express = require('express');
const router = express.Router();

/*====== Controller ======*/ 
const controller = require('../controllers/productsController');

// Listado - GET - index 
router.get('/', controller.index);

// Creación - GET - create
router.get('/create', controller.create);

// Creación - POST - create
router.post('/create', controller.store);

// Eliminar - DELETE - destroy
router.delete('/:id', controller.destroy);

// Detalle - GET - show
router.get('/:id', controller.show);


module.exports = router;
