const request = require('request');
const constant = require('../config/constant');
const validation = require('../validate/validate')
const flowService = require('../sqlService/flowService');


exports.getFlows = async (req, res) => {
    try {
        const paginateCategory = req.body;
        const selectFlows = await flowService.selectFlows();
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectFlows,
            data: selectFlows? selectFlows : [],
            // totalCount: selectProducts.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


// GET FLOW CATEGORY
exports.getFlowsCategoryByID = async (req, res) => {
    try {
        const flow_id = req.query['flow_id'];
        const selectFlows = await flowService.getFlowsCategoryByID(flow_id);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectFlows,
            data: selectFlows? selectFlows : [],
            // totalCount: selectProducts.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.getFlowByID = async (req, res) => {
    try {
        const flow_id = req.query['flow_id'];
        const selectFlow = await flowService.getFlowByID(flow_id);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectFlows,
            data: selectFlow? selectFlow : [],
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.editFlows = async (req, res) => {
    try {
        const flow_id = req.query['flow_id'];
        const selectFlows = await flowService.editFlows(flow_id);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectFlows,
            data: selectFlows? selectFlows : [],
            // totalCount: selectProducts.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.getFlowsCount = async (req, res) => {
    try {
        const selectFlows = await flowService.getFlowsCount();
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectFlows,
            data: selectFlows? selectFlows : [],
            // totalCount: selectProducts.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.saveFlow = async (req, res) => {
    try {
        const { value, error } = validation.validateFlow(req.body);
        if (error) {
            let errorArray = [];
            error.details.forEach(element => {
                if (element.message) {
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else {
            const selectProduct = await flowService.insertFlow(value);
            if (selectProduct.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertFlow,
                    data: []
                });
            }
            if (selectProduct.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateFlow,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.updateDragFlowsDetail = async (req, res) => {
    try {
        const flowData = req.body;
        // console.log(flowData, " flowData");
        const selectFlowData = await flowService.updateDragFlowsDetail(flowData);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.updateFlow,
            data: selectFlowData,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}



exports.getQuestions = async (req, res) => {
    try {
        const getQuestionsID = req.body;
        const selectFlows = await flowService.selectFlowQuestions(getQuestionsID);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectFlows,
            data: selectFlows? selectFlows : [],
            // totalCount: selectProducts.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

// GET FLOW Selected Que Ans By ID
exports.getSelectedQueAnsByID = async (req, res) => {
    try {
        const flowQueID = {
            flow_id: req.query['flow_id'],
            que_id: req.query['que_id']
        }
        const selectFlowsQueAns = await flowService.getSelectedQueAnsByID(flowQueID);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectFlows,
            data: selectFlowsQueAns? selectFlowsQueAns : [],
            // totalCount: selectProducts.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.saveFlowBuilder = async (req, res) => {
    try {
        const { value, error } = validation.validateFlowBuilder(req.body);
        if (error) {
            let errorArray = [];
            error.details.forEach(element => {
                if (element.message) {
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else {
            const selectProduct = await flowService.insertFlowBuilder(value);
            if (selectProduct.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertFlowBuilder,
                    data: []
                });
            }
            if (selectProduct.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateFlowBuilder,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.aimlPostCategory = async(req, res) => {
    request({
        url: 'http://18.225.0.47:5005/api/category',
        method: "POST",
        json: true,
        body: req.body
    }, function (error, response, body){
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: 'AIML Executed ',
            error: error,
            data: body
        });
    });
}