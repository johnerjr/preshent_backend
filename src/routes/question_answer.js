let express = require('express');
let auth = require('../middleware/auth');
let router = express.Router();
let question_answerController = require('../controller/question_answerController');


router.get('/getQuestions',  question_answerController.getQuestions);
router.post('/saveQuestion', question_answerController.saveQuestion);

router.get('/getAnswers',  question_answerController.getAnswers);
router.post('/saveAnswer', question_answerController.saveAnswer);

router.post('/updateDragAnswerDetail', question_answerController.updateDragAnswerDetail);



module.exports = router;
