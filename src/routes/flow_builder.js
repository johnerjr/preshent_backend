let express = require('express');
let auth = require('../middleware/auth');
let router = express.Router();
let flow_builderControloler = require('../controller/flow_builderController');


router.get('/getFlows',  flow_builderControloler.getFlows);
router.post('/saveFlow', flow_builderControloler.saveFlow);

router.post('/getQuestions',  flow_builderControloler.getQuestions);
router.post('/saveFlowBuilder', flow_builderControloler.saveFlowBuilder);
router.get('/getFlowsCount', flow_builderControloler.getFlowsCount);
router.get('/editFlows', flow_builderControloler.editFlows);
router.get('/getFlowsCategoryByID', flow_builderControloler.getFlowsCategoryByID);
router.get('/getSelectedQueAnsByID', flow_builderControloler.getSelectedQueAnsByID);
router.post('/updateDragFlowsDetail', flow_builderControloler.updateDragFlowsDetail);
router.get('/getFlowByID', flow_builderControloler.getFlowByID);

router.post('/aimlPostCategory', flow_builderControloler.aimlPostCategory);









module.exports = router;
