const DBconnection = require("../config/db.js");

exports.selectQuestions = async () => {
    const sql = `SELECT questions.id, questions.question_name, questions.isDeleted,questions.isActivated, questions.question_name,
        COUNT(answers.id) AS Total
        FROM questions
        LEFT JOIN answers ON questions.id = answers.question_id
        GROUP BY questions.id `;
    const questions = await DBconnection.query(sql);
    return questions;
}

exports.insertQuestion = async (detail) => {
    if (detail.id) {
        var sql = "UPDATE questions SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {
        const insertQuery = await DBconnection.query('INSERT INTO questions SET ?', detail);
        const newInsertQuery = {
            method: 'insert',
            selectQuestions: insertQuery
        }
        return newInsertQuery;
    }
}


exports.insertAnswer = async (detail) => {
    if (detail.id) {
        var sql = "UPDATE answers SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {

        const newCountQuery = await DBconnection.query("SELECT COUNT(*) as totalCount FROM answers");
        // console.log(newCountQuery, " newCatQuery");
        if (newCountQuery[0].totalCount >= 0) {
            const position = parseInt(newCountQuery[0].totalCount) + 1;
            detail['position'] = position;
            // console.log(detail, " newCatQuery detail");
            const insertQuery = await DBconnection.query('INSERT INTO answers SET ?', detail);
            const newInsertQuery = {
                method: 'insert',
                selectQuestions: insertQuery
            }
            return newInsertQuery;
        }



    }

}

exports.selectAnswers = async (question_id) => {
    const sql = "SELECT * FROM ??  WHERE question_id = ? ORDER BY position ASC";
    const selectQuestion = ['answers', question_id];
    const questions = await DBconnection.query(sql, selectQuestion);
    return questions;
}


exports.updateDragAnswerDetail = async (detail) => {
    // console.log(detail, " detail");
    if (detail.oldAnswer) {
        const oldAns = detail.oldAnswer;
        const currentAns = detail.currentAnswer;
        var sql = "UPDATE answers SET ? WHERE id = ?";
        const updateQuery1 = await DBconnection.query(sql, [oldAns, oldAns.id]);
        const updateQuery2 = await DBconnection.query(sql, [currentAns, currentAns.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: {
                updateQuery: updateQuery1,
                updateQuery: updateQuery2
            }
        }
        return newUpdateQuery;
    }
    // var sql = "UPDATE answers SET ? WHERE id = ?";
    // const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
    // const newUpdateQuery = {
    //     method: 'update',
    //     selectSubCategories: updateQuery
    // }
    // return newUpdateQuery;

}
