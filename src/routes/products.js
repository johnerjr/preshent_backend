let express = require('express');
let auth = require('../middleware/auth');
let router = express.Router();
let productsController = require('../controller/produtController');


router.get('/getProducts',  productsController.getProducts);
router.post('/saveProducts', productsController.saveProducts);

router.get('/getOffer' ,productsController.getOffer);
router.post('/saveOffer', productsController.saveOffer);
router.get('/getProductsCount', productsController.getProductsCount);
router.get('/productsById', productsController.productsById);
router.get('/getproductsById', productsController.getproductsById);
router.post('/updateProductStatus', productsController.updateProductStatus);



module.exports = router;
