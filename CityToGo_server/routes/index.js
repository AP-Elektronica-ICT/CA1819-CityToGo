express = require('express');
var router = express.Router();

var userData_controller = require('../controllers/userData')

/*
 * Routes that can be accessed by anyone (temporally)
 */
router.get('/api/v1/userData/test', userData_controller.test);
router.post('/api/v1/userData/create', userData_controller.product_create);

// router.get('/api/v1/product/:id', products.getOne);
// router.post('/api/v1/product/', products.create);
// router.put('/api/v1/product/:id', products.update);
// router.delete('/api/v1/product/:id', products.delete);

module.exports = router;