const constant = require('../config/constant');
const validation = require('../validate/validate')
const categoriesService = require('../sqlService/categoriesService');

exports.getCetegories = async (req, res) => {
    try {
        // console.log(req.query, " req.query ");
        const paginateCategory = req.query;
        const selectCategories = await categoriesService.selectCategogires(paginateCategory);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectCetegories,
            data: selectCategories.categories,
            totalCount: selectCategories.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.getCategogiresForProduct = async (req, res) => {
    try {
        const paginateCategory = req.query;
        const selectCategories = await categoriesService.selectCategogiresForProduct(paginateCategory);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectCetegories,
            data: selectCategories.categories,
            totalCount: selectCategories.totalCount
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}



exports.getAllCetegories = async (req, res) => {
    try {
        const selectCategories = await categoriesService.getAllCetegories();
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectCetegories,
            data: selectCategories,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.getCategoriesCount = async (req, res) => {
    try {
        const selectCategories = await categoriesService.getCategoriesCount();
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectCetegories,
            data: selectCategories
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.saveCetegories = async (req, res) => {
    try {
        const { value, error } = validation.validateCategories(req.body);
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
            const selectCategories = await categoriesService.insertCategogires(value);
            if (selectCategories.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertCetegories,
                    data: []
                });
            }
            if (selectCategories.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateCetegories,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}



exports.getSubCetegories = async (req, res) => {
    const categoriesID = req.query.categoriesID ? req.query.categoriesID : '';
    try {
        if (categoriesID) {
            const selectSubCategories = await categoriesService.selectSubCategogires(categoriesID);
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.selectSubCetegories,
                data: selectSubCategories
            });

        } else {
            const selectSubCategories = await categoriesService.selectSubCategogires(categoriesID);
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.selectSubCetegories,
                data: selectSubCategories
            });
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.saveSubCetegories = async (req, res) => {
    try {
        const { value, error } = validation.validateSubCategories(req.body);
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
            const selectSubCategories = await categoriesService.insertSubCategogires(value);
            if (selectSubCategories.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertSubCetegories,
                    data: []
                });
            }
            if (selectSubCategories.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateSubCetegories,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}



exports.getMinorCetegories = async (req, res) => {
    try {
        const subCategoriesID = req.query.subCategoriesID ? req.query.subCategoriesID : '';
        if (subCategoriesID) {
            const selectMinorCategories = await categoriesService.selectMinorCategogires(subCategoriesID);
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.selectMinorCetegories,
                data: selectMinorCategories
            });
        } else {
            const selectMinorCategories = await categoriesService.selectMinorCategogires(subCategoriesID);
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.selectMinorCetegories,
                data: selectMinorCategories
            });
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error)
    }
}

exports.saveMinorCetegories = async (req, res) => {
    try {
        const { value, error } = validation.validateMinorCategories(req.body);
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
            const selectSubCategories = await categoriesService.insertMinorCategogires(value);
            if (selectSubCategories.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertMinorCetegories,
                    data: []
                });
            }
            if (selectSubCategories.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateMinorCetegories,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }

}


exports.filterCetegories = async (req, res) => {
    try {
        const paginateCategory = req.query;
        const { value, error } = validation.validateFilterCategories(req.body);
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
            const filterCategory = {
                name: value.name,
                page: paginateCategory.page,
                perPage: paginateCategory.perPage
            }
            const selectFilterCategories = await categoriesService.filterCategogires(filterCategory);
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.selectCetegories,
                data: selectFilterCategories.categories,
                totalCount: selectFilterCategories.totalCount
            });
        }
    } catch {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}






// exports.getSubCategoriesCount = async (req, res) => {
//     try {
//         const selectSubCategories = await categoriesService.getSubCategoriesCount();
//         return res.status(constant.httpCode.success).json({
//             success: true,
//             code: constant.httpCode.success,
//             message: constant.message.selectCetegories,
//             data: selectSubCategories
//         });
//     } catch (error) {
//         return res.status(constant.httpCode.internalServerError).json(error);
//     }
// }

// exports.getMinorCategoriesCount = async (req, res) => {
//     try {
//         const selectMinorCategoriesCount = await categoriesService.getMinorCategoriesCount();
//         return res.status(constant.httpCode.success).json({
//             success: true,
//             code: constant.httpCode.success,
//             message: constant.message.selectCetegories,
//             data: selectMinorCategoriesCount
//         });
//     } catch (error) {
//         return res.status(constant.httpCode.internalServerError).json(error);
//     }
// }