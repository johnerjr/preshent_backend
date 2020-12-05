const DBconnection = require("../config/db.js");

exports.selectFlows = async () => {
    const sql = "SELECT * FROM ?? ORDER BY position ASC";
    const selectProducts = ['flow'];
    const flows = await DBconnection.query(sql, selectProducts);
    return flows;
}

exports.getFlowsCategoryByID = async (flow_id) => {
    const flowCategory = await DBconnection.query(`SELECT * FROM flowCategory WHERE flow_id = ${flow_id}`);
    return flowCategory;
}


exports.getFlowByID = async (flow_id) => {
    const flow = await DBconnection.query(`SELECT * FROM flow WHERE id = ${flow_id}`);
    return flow;
}


exports.editFlows = async (flow_id) => {
    const sql = "SELECT * FROM ?? WHERE id = ? ORDER BY id ASC";
    const selectProducts = ['flow', flow_id];
    const flows = await DBconnection.query(sql, selectProducts);
    return flows;
}


exports.getFlowsCount = async () => {
    var sql1 = "SELECT COUNT(*) as totalCount FROM ??";
    var table = ["flow"];
    newQuery = await DBconnection.query(sql1, table);
    const finalProducts = {
        'totalCount': newQuery[0].totalCount
    }
    return finalProducts;
}

exports.insertFlow = async (detail) => {
    if (detail.id) {
        var sql = "UPDATE flow SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {

        const newFlow = await DBconnection.query("SELECT COUNT(*) as totalCount FROM flow");
        // console.log(newFlow, " newFlow");
        if (newFlow[0].totalCount >= 0) {
            const position = parseInt(newFlow[0].totalCount) + 1;
            detail['position'] = position;
            const insertQuery = await DBconnection.query('INSERT INTO flow SET ?', detail);
            const newInsertQueryOfferProuct = {
                method: 'insert',
                selectQuestions: insertQuery
            }
            return newInsertQueryOfferProuct;
        }


        // const insertQuery = await DBconnection.query('INSERT INTO flow SET ?', detail);
        // const newInsertQueryOfferProuct = {
        //     method: 'insert',
        //     selectSubCategories: insertQuery
        // }
        // return newInsertQueryOfferProuct;
    }

}

exports.selectFlowQuestions = async (detail) => {
    if (detail) {
        let quesIds = JSON.parse(detail.qusetion_ids);
        newQuesIds = [] + quesIds;
        let Query = `SELECT * FROM questions WHERE id IN (${newQuesIds})`;
        const selectQuestion = await DBconnection.query(Query);
        return selectQuestion;
    } else {
        const selectQuestion = ''
        return selectQuestion;
    }

}



exports.getSelectedQueAnsByID = async (fQA) => {
    const flowquestionAns = await DBconnection.query(`SELECT * FROM flowBuilder WHERE flow_id = ${fQA.flow_id} AND flow_questions = ${fQA.que_id}`);
    return flowquestionAns;
}


exports.insertFlowBuilder = async (detail) => {
    if (detail.id) {
        const fBD = {
            flow_id : detail.flow_id,
            flow_questions:  detail.flow_questions,
            flow_Question_answers :detail.flow_Question_answers
        }
        const id = parseInt(detail.id)
        var sql = "UPDATE flowBuilder SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [fBD, id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {
        if (detail.type === 'flowQuestion') {
            const fBD = {
                flow_id : detail.flow_id,
                flow_questions:  detail.flow_questions,
                 flow_Question_answers :detail.flow_Question_answers
            }
            
            const insertQuery = await DBconnection.query('INSERT INTO flowBuilder SET ?', fBD);
            const newInsertQueryOfferProuct = {
                method: 'insert',
                selectSubCategories: insertQuery
            }
            return newInsertQueryOfferProuct;
        }
        if (detail.type === 'flowCategory') {
            if (detail.category.length >= 0) {
                let sqlDel1 = DBconnection.query(`DELETE FROM flowCategory WHERE flow_id = ${detail.flow_id}`);
                if (sqlDel1) {
                    let categoryArray = JSON.parse(detail.category);
                    categoryArray.map((elem, indx) => {
                        elem['flow_id'] = detail.flow_id;
                    });

                    categoryArray.map((cats, index) => {
                        DBconnection.query('INSERT INTO flowCategory SET ?', cats);
                    });
                    const newInsertQueryFlowCategory = {
                        method: 'insert',
                        selectSubCategories: 'inserted'
                    }
                    return newInsertQueryFlowCategory;
                }
            };
        }
    }
}  

exports.updateDragFlowsDetail = async (detail) => {
    // console.log(detail, " detail");
    if (detail.oldFlow) {
        const oldFlows = detail.oldFlow;
        const currentFlows = detail.currentFlow;

        var sql = "UPDATE flow SET ? WHERE id = ?";
        const updateQuery1 = await DBconnection.query(sql, [oldFlows, oldFlows.id]);
        const updateQuery2 = await DBconnection.query(sql, [currentFlows, currentFlows.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: {
                updateQuery: updateQuery1,
                updateQuery: updateQuery2
            }
        }
        return newUpdateQuery;

    }

}
