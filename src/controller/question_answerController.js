const constant = require('../config/constant');
const validation = require('../validate/validate')
const question_answerService = require('../sqlService/question_answerService');



exports.getQuestions = async (req, res) => {
    try {
        const selectQuestion = await question_answerService.selectQuestions();
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectCetegories,
            data: selectQuestion,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.saveQuestion = async (req, res) => {
    try {
        const { value, error } = validation.validateQuestions(req.body);
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
            const selectQuestion = await question_answerService.insertQuestion(value);
            if (selectQuestion.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertQuestion,
                    data: []
                });
            }
            if (selectQuestion.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateQuestion,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

exports.saveAnswer = async (req, res) => {
    try {
        const { value, error } = validation.validateAnswers(req.body);
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
            const selectAnswer = await question_answerService.insertAnswer(value);
            if (selectAnswer.method == 'insert') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.insertAnswer,
                    data: []
                });
            }
            if (selectAnswer.method == 'update') {
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.updateAnswer,
                    data: []
                });
            }
        }
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.getAnswers = async (req, res) => {
    try {
        const question_id = req.query['question_id'];
        const selectAnswers = await question_answerService.selectAnswers(question_id);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.selectAnswers,
            data: selectAnswers,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}


exports.updateDragAnswerDetail = async (req, res) => {
    try {
        const answerData = req.body;
        // console.log(answerData, " answerData");
        const selectAnswers = await question_answerService.updateDragAnswerDetail(answerData);
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.updateAnswer,
            data: selectAnswers,
        });
    } catch (error) {
        return res.status(constant.httpCode.internalServerError).json(error);
    }
}

