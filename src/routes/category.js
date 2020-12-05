let express = require('express');
let auth = require('../middleware/auth');
let router = express.Router();
let categoriesController = require('../controller/categoriesController');

router.get('/getCetegories', auth ,categoriesController.getCetegories);
router.get('/getCategogiresForProduct', auth ,categoriesController.getCategogiresForProduct);
router.get('/getCategoriesCount', categoriesController.getCategoriesCount);
router.get('/getSubCetegories', categoriesController.getSubCetegories);
router.get('/getMinorCetegories', categoriesController.getMinorCetegories);
router.post('/saveCetegories', categoriesController.saveCetegories);
router.post('/saveSubCetegories', categoriesController.saveSubCetegories);
router.post('/saveMinorCetegories', categoriesController.saveMinorCetegories);
router.post('/filterCetegories', categoriesController.filterCetegories);
router.get('/getAllCetegories' ,categoriesController.getAllCetegories);

// router.get('/getSubCategoriesCount', categoriesController.getSubCategoriesCount);
// router.get('/getMinorCategoriesCount', categoriesController.getMinorCategoriesCount);

module.exports = router;
