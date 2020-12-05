const constant = require('../config/constant');
const validation = require('../validate/validate')
const productsService = require('../sqlService/productsService');


exports.getProducts = async (req, res) => {
    try {
        const paginateCategory = req.query;
        const selectProducts = await productsService.selectProducts(paginateCategory);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectCetegories,
            data: selectProducts.products,
            totalCount: selectProducts.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.saveProducts = async (req, res) => {
    try {        
        const { value, error } = validation.validateProducts(req.body.product);
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
            const selectProduct = await productsService.insertProducts(req.body);
            if (selectProduct.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertProducts,
                    data: []
                });
            }
            if (selectProduct.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateProducts,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.updateProductStatus = async (req, res) => {
    try {        
        const { value, error } = validation.validateProducts(req.body.product);
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
            const selectProduct = await productsService.updateProductStatus(value);
            if (selectProduct) {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateProducts,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}



exports.saveOffer = async (req, res) => {
    try {
        const { value, error } = validation.validateOffer(req.body);
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
            const selectOffer = await productsService.insertOffer(value);
            if (selectOffer.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertOffer,
                    data: []
                });
            }
            if (selectOffer.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateOffer,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.getOffer = async (req, res) => {
    try {
        const getOffers = await productsService.getOffer();
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.getOffer,
            data: getOffers,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.getProductsCount = async (req, res) => {
    try {
        const selectProducts = await productsService.selectProductsCount();
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectCetegories,
            data: selectProducts
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }  
}

exports.getproductsById = async (req, res) => {
    try {
        const product_id = req.query['product_id'];
        const selectProducts = await productsService.getproductsById(product_id);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectAnswers,
            data: selectProducts,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.productsById = async (req, res) => {
    try {
        const product_id = req.query['product_id'];
        const selectProducts = await productsService.productsById(product_id);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            data: selectProducts,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}