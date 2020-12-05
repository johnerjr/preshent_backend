const DBconnection = require("../config/db.js");

exports.selectCategogires = async (paginateCategory) => {
    // console.log(paginateCategory, " paginateCategory SQL ");
    let startNum;
    let LimitNum;
    if (paginateCategory.page == '' && paginateCategory.perPage == '') {
        startNum = 0;
        LimitNum = 10;
    } else {
        startNum = parseInt(paginateCategory.page);
        LimitNum = parseInt(paginateCategory.perPage);
    }
    // console.log(LimitNum, " Limit ", startNum, " OFFSET")
    const sql = `SELECT c.*, COUNT(pc.category) as TotalProduct FROM categories c
    LEFT JOIN productCategory pc on c.id = pc.category
    GROUP BY c.id ORDER BY id ASC limit ? OFFSET ?`
    const selectCategories = [LimitNum, startNum];
    const categories = await DBconnection.query(sql, selectCategories);
    // console.log(categories, " categories SQL ");

    // const sql = "SELECT * FROM ?? ORDER BY id ASC limit ? OFFSET ?";
    // const selectCategories = ['categories', LimitNum, startNum];
    // const categories = await DBconnection.query(sql, selectCategories);
    if (categories && categories.length > 0) {
        var sql1 = "SELECT COUNT(*) as totalCount FROM ??";
        var table = ["categories"];
        newQuery = await DBconnection.query(sql1, table);
        const finalCategory = {
            "categories": categories,
            'totalCount': newQuery[0].totalCount
        }
        return finalCategory;
    } else {
        return categories;
    }
}

exports.selectCategogiresForProduct = async (paginateCategory) => {
    let startNum;
    let LimitNum;
    if (paginateCategory.page == '' && paginateCategory.perPage == '') {
        startNum = 0;
        LimitNum = 10;
    } else {
        startNum = parseInt(paginateCategory.page);
        LimitNum = parseInt(paginateCategory.perPage);
    }
    const sql = `SELECT c.*, COUNT(pc.category) as TotalProduct FROM categories c
    LEFT JOIN productCategory pc on c.id = pc.category
    WHERE c.status = 1
    GROUP BY c.id ORDER BY id ASC limit ? OFFSET ?`
    const selectCategories = [LimitNum, startNum];
    const categories = await DBconnection.query(sql, selectCategories);
    if (categories && categories.length > 0) {
        var sql1 = "SELECT COUNT(*) as totalCount FROM ??";
        var table = ["categories"];
        newQuery = await DBconnection.query(sql1, table);
        const finalCategory = {
            "categories": categories,
            'totalCount': newQuery[0].totalCount
        }
        return finalCategory;
    } else {
        return categories;
    }
}





exports.getAllCetegories = async () => {
    const categories = await DBconnection.query("SELECT * FROM categories");
    return categories;
}


exports.getCategoriesCount = async () => {
    // var sqlGetCat = "SELECT COUNT(*) as totalCount FROM ??";
    // var tableCat = ["categories"];
    // newCatQuery = await DBconnection.query(sqlGetCat, tableCat);
    // const finalCategory = {
    //     'totalCount': newCatQuery[0].totalCount
    // }
    // return finalCategory;
    // const sql = `SELECT c.id as id, c.name as name, sc.id as sc_id, sc.name as sc_name, mc.id as mc_id, mc.name as mc_name 
    // FROM categories as c
    // LEFT JOIN subCategories as sc ON (sc.categoriesID = c.id)
    // LEFT JOIN minorCategories as mc ON (mc.subCategoriesID = sc.id)`

    const sql = `SELECT c.id as id, c.name as name, sc.id as sc_id, sc.name as sc_name, mc.id as mc_id, mc.name as mc_name 
        FROM categories as c
        LEFT JOIN subCategories as sc ON (sc.categoriesID = c.id AND sc.status = 1)
        LEFT JOIN minorCategories as mc ON (mc.subCategoriesID = sc.id AND mc.status = 1)
        WHERE c.status = 1;`
    newCatQuery = await DBconnection.query(sql);
    return newCatQuery;
}

exports.insertCategogires = async (detail) => {
    if (detail.id) {
        var sql = "UPDATE categories SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {
        const insertQuery = await DBconnection.query('INSERT INTO categories SET ?', detail);
        const newInsertQuery = {
            method: 'insert',
            selectSubCategories: insertQuery
        }
        return newInsertQuery;
    }
}

exports.selectSubCategogires = async (categoriesID) => {
    if (categoriesID) {

        const sql = `SELECT sc.*, COUNT(pc.subCategory) as TotalProduct FROM subCategories sc
        LEFT JOIN productCategory pc on sc.id = pc.subCategory WHERE sc.categoriesID = ?
        GROUP BY sc.id`
        const selectSubCategories = [categoriesID];
        const subCategories = await DBconnection.query(sql, selectSubCategories);

        // const sql = "SELECT * FROM ?? WHERE ?? = ?";
        // const selectSubCategories = ['subCategories', 'categoriesID', categoriesID];
        // const subCategories = await DBconnection.query(sql, selectSubCategories);
        return subCategories;
    } else {

        const sql = `SELECT sc.*, COUNT(pc.subCategory) as TotalProduct FROM subCategories sc
        LEFT JOIN productCategory pc on sc.id = pc.subCategory
        GROUP BY sc.id`
        // const selectSubCategories = [categoriesID];
        const subCategories = await DBconnection.query(sql);

        // const sql = "SELECT * FROM ??";
        // const selectSubCategories = ['subCategories'];
        // const subCategories = await DBconnection.query(sql, selectSubCategories);
        return subCategories;
    }
}

exports.insertSubCategogires = async (detail) => {
    if (detail.id) {
        var sql = "UPDATE subCategories SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {
        const insertQuery = await DBconnection.query('INSERT INTO subCategories SET ?', detail);
        const newInsertQuery = {
            method: 'insert',
            selectSubCategories: insertQuery
        }
        return newInsertQuery;
    }
}

exports.selectMinorCategogires = async (subCategoriesID) => {
    if (subCategoriesID) {

        const sql = `SELECT mc.*, COUNT(pc.minorCategory) as TotalProduct FROM minorCategories mc
        LEFT JOIN productCategory pc on mc.id = pc.minorCategory WHERE mc.subCategoriesID = ?
        GROUP BY mc.id`
        const selectMinorCategories = [subCategoriesID];
        const subCategories = await DBconnection.query(sql, selectMinorCategories);


        // const sql = "SELECT * FROM ?? WHERE ?? = ?";
        // const selectMinorCategories = ['minorCategories', 'subCategoriesID', subCategoriesID];
        // const subCategories = await DBconnection.query(sql, selectMinorCategories);
        return subCategories;
    } else {

        const sql = `SELECT mc.*, COUNT(pc.minorCategory) as TotalProduct FROM minorCategories mc
        LEFT JOIN productCategory pc on mc.id = pc.minorCategory
        GROUP BY mc.id`
        const subCategories = await DBconnection.query(sql);

        // const sql = "SELECT * FROM ??";
        // const selectMinorCategories = ['minorCategories'];
        // const subCategories = await DBconnection.query(sql, selectMinorCategories);
        return subCategories;
    }
}

exports.insertMinorCategogires = async (detail) => {
    if (detail.id) {
        var sql = "UPDATE minorCategories SET ? WHERE id = ?";
        const updateQuery = await DBconnection.query(sql, [detail, detail.id]);
        const newUpdateQuery = {
            method: 'update',
            selectSubCategories: updateQuery
        }
        return newUpdateQuery;
    } else {
        const insertQuery = await DBconnection.query('INSERT INTO minorCategories SET ?', detail);
        const newInsertQuery = {
            method: 'insert',
            selectSubCategories: insertQuery
        }
        return newInsertQuery;
    }
}

exports.filterCategogires = async (detail) => {
    let startNum;
    let LimitNum;
    if (detail.page == '' && detail.perPage == '') {
        startNum = 0;
        LimitNum = 10;
    } else {
        startNum = parseInt(detail.page);
        LimitNum = parseInt(detail.perPage);
    }

    const sql = `SELECT c.*, COUNT(pc.category) as TotalProduct FROM categories c
            LEFT JOIN productCategory pc on c.id = pc.category
            WHERE name like "%" '${detail.name}' "%"
            GROUP BY c.id ORDER BY id ASC limit ? OFFSET ?`
    const selectCategories = [LimitNum, startNum];
    const filterQuery = await DBconnection.query(sql, selectCategories);
    // old code for only category filteration //
    // const filterQuery = await DBconnection.query("SELECT * FROM categories WHERE name like '%" + detail.name + "%' LIMIT " + LimitNum + " OFFSET " + startNum);
    if (filterQuery && filterQuery.length > 0) {
        var sql1 = "SELECT COUNT(*) as totalCount FROM ??";
        var table = ["categories"];
        newQuery = await DBconnection.query(sql1, table);
        const finalCategory = {
            "categories": filterQuery,
            'totalCount': newQuery[0].totalCount
        }
        return finalCategory;
    } else {
        return filterQuery;
    }
}


// exports.getSubCategoriesCount = async () => {
//     var sqlGetCat = "SELECT COUNT(*) as totalCount FROM ??";
//     var tableCat = ["subCategories"];
//     newsubCategories = await DBconnection.query(sqlGetCat, tableCat);
//     const finalnewsubCategories = {
//         'totalCount': newsubCategories[0].totalCount
//     }
//     return finalnewsubCategories;
// }

// exports.getMinorCategoriesCount = async () => {
//     var sqlGetCat = "SELECT COUNT(*) as totalCount FROM ??";
//     var tableCat = ["minorCategories"];
//     newMinorCategories = await DBconnection.query(sqlGetCat, tableCat);
//     const finalMinorCategories = {
//         'totalCount': newMinorCategories[0].totalCount
//     }
//     return finalMinorCategories;
// }
